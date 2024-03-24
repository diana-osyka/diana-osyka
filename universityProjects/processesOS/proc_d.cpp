#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/sem.h>
#include <sys/shm.h>
#include <unistd.h>
#include <signal.h>

int main(int argc, char *argv[]) {
    int s; // Socket ID variable
    // Convert arguments
    int semS2 = atoi(argv[1]);
    int shmemSM2 = atoi(argv[2]);

    char buf[200]; // Buffer for reading
    // Attach to shared memory
    char *shmaddr;
    shmaddr = (char *)shmat(shmemSM2, NULL, 0);
    if (shmaddr == (void *)-1) {
        perror("Failed to attach SM2");
        exit(EXIT_FAILURE);
    }

    struct sembuf sb;

    // Create socket
    int portNum = atoi(argv[3]);
    struct sockaddr_in my_addr;
    if ((s = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
        perror("Failed to create socket");
        exit(EXIT_FAILURE);
    }

    // Connect to the server
    my_addr.sin_family = AF_INET;
    my_addr.sin_port = htons(portNum);
    my_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    bzero(&(my_addr.sin_zero), 8);
    if (connect(s, (struct sockaddr *)&my_addr, sizeof(my_addr)) == -1) {
        perror("connect");
        exit(EXIT_FAILURE);
    }

    kill(getppid(), SIGUSR1); // Signal the parent process

    while (1) {
        // Set the semaphore according to the assignment
        sb.sem_num = 0;
        sb.sem_op = 1;
        sb.sem_flg = SEM_UNDO;
        if (semop(semS2, &sb, 1) == -1) {
            perror("Failed to set semaphore");
            exit(EXIT_FAILURE);
        }

        strcpy(buf, shmaddr);
        printf("Read: %s\n", buf);
        write(s, buf, strlen(buf) + 1);
        memset(buf, '\0', sizeof(buf));

        // Release the semaphore
        sb.sem_num = 1;
        sb.sem_op = -1;
        sb.sem_flg = SEM_UNDO;
        if (semop(semS2, &sb, 1) == -1) {
            perror("Failed to set semaphore");
            exit(EXIT_FAILURE);
        }

        sleep(1);
    }

    return 0;
}
