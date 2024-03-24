#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <string.h>

FILE* file;
int pipeP1;

void exitWithClosingFile(){
    fclose(file);
    exit(EXIT_FAILURE);
}

void signalHandler(int sig){
    char text[100];
    int lenght = fscanf(file,"%99[^\n]", text);
    if(lenght == EOF ||  lenght == 0) exitWithClosingFile();

    fgetc(file);

    printf("Process 2: %s\n", text);
    if(lenght == EOF ||  lenght == 0) exitWithClosingFile();

    if(write(pipeP1, text, strlen(text)) == -1){
        exitWithClosingFile();
    }
}

int main(int argc, char *argv[]){
    if(argc == 1) exit(EXIT_FAILURE);

    file = fopen("p2.txt", "r");
    if(file == NULL) exit(EXIT_FAILURE);

    pipeP1 = atoi(argv[1]);
    if(signal(SIGUSR1, signalHandler) == SIG_ERR){
        exitWithClosingFile();
    }

    while(true) sleep(1);
    fclose(file); 

    return 0;
}