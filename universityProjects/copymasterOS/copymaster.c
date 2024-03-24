#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <stdbool.h>
#include <dirent.h>
#include <time.h>
#include <inttypes.h>
#include <pwd.h>

#include "options.h"


void FatalError(char c, const char* msg, int exit_status);
void PrintCopymasterOptions(struct CopymasterOptions* cpm_options);


int main(int argc, char* argv[]){
    struct CopymasterOptions cpm_options = ParseCopymasterOptions(argc, argv);

    //-------------------------------------------------------------------
    // Kontrola hodnot prepinacov
    //-------------------------------------------------------------------

    // Vypis hodnot prepinacov odstrante z finalnej verzie
    
    PrintCopymasterOptions(&cpm_options);
    
    //-------------------------------------------------------------------
    // Osetrenie prepinacov pred kopirovanim
    //-------------------------------------------------------------------
    
    if (cpm_options.fast && cpm_options.slow) {
        fprintf(stderr, "KONFLIKT PREPINACOV\n"); 
        exit(42);
    }
    
    // TODO Nezabudnut dalsie kontroly kombinacii prepinacov ...
    if ((cpm_options.overwrite && cpm_options.append) 
    || (cpm_options.overwrite && cpm_options.create)) {
        fprintf(stderr, "KONFLIKT PREPINACOV\n"); 
        exit(42);
    }
    if((cpm_options.sparse && cpm_options.fast)
    || (cpm_options.sparse && cpm_options.slow)
    || (cpm_options.sparse && cpm_options.create)
    || (cpm_options.sparse && cpm_options.overwrite)
    || (cpm_options.sparse && cpm_options.append)
    || (cpm_options.sparse && cpm_options.lseek)
    || (cpm_options.sparse && cpm_options.directory)
    || (cpm_options.sparse && cpm_options.delete_opt)
    || (cpm_options.sparse && cpm_options.chmod)
    || (cpm_options.sparse && cpm_options.inode)
    || (cpm_options.sparse && cpm_options.umask)
    || (cpm_options.sparse && cpm_options.link)
    || (cpm_options.sparse && cpm_options.truncate)){
        fprintf(stderr, "CHYBA PREPINACOV\n"); 
        exit(EXIT_FAILURE);
    }
    //-------------------------------------------------------------------
    // Kopirovanie suborov
    //-------------------------------------------------------------------
 
    // TODO Implementovat kopirovanie suborov

    if(cpm_options.fast){
        char buf[1000000];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('f', "SUBOR NEEXISTUJE", -1);
        }
        if((outf = open(cpm_options.outfile, O_WRONLY | O_TRUNC)) == (-1)){
            FatalError('f', "INA CHYBA", -1);
        }
        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.slow){
        char buf[1];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('s', "SUBOR NEEXISTUJE", -1);
        }
        if((outf = open(cpm_options.outfile, O_WRONLY  | O_TRUNC)) == (-1)){
            FatalError('s', "INA CHYBA", -1);
        }
        int i;
        while((i = read(inf, buf, 1)) > 0){
            write(outf, buf, i);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.create){
        char buf[1000000];
        int inf;
        int outf;
        
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('c', "SUBOR NEEXISTUJE", 23);
        }

        if((outf = open(cpm_options.outfile, O_WRONLY)) != (-1)){
            FatalError('c', "SUBOR EXISTUJE", 23);
        }

        if((outf = open(cpm_options.outfile, O_WRONLY | O_CREAT, cpm_options.create_mode)) == (-1)){
            FatalError('c', "SUBOR EXISTUJE", 23);
        }

        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i); 
        }

        close(inf);
        close(outf);
    }
    
    if(cpm_options.overwrite){
        char buf[1000000];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('o', "SUBOR NEEXISTUJE", 24);
        }
        if((outf = open(cpm_options.outfile, O_WRONLY | O_TRUNC)) == (-1)){
            FatalError('o', "INA CHYBA", 24);
        }
        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.append){
        char buf[1000000];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('a', "SUBOR NEEXISTUJE", 22);
        }
        if((outf = open(cpm_options.outfile, O_WRONLY | O_APPEND)) == (-1)){
            FatalError('a', "INA CHYBA", 22);
        }
        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.lseek){

        int inf, outf;

        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('l', "INA CHYBA", 33);
        }

        if((outf = open(cpm_options.outfile, O_WRONLY)) == (-1)){
            FatalError('l', "INA CHYBA", 33);
        }

        if((lseek(inf, cpm_options.lseek_options.pos1, SEEK_SET)) == (-1)){
            FatalError('l', "CHYBA POZICIE infile", 33);
        }

        
        int lseekReturn = 0;
        //Seting cursor for outfile
        switch (cpm_options.lseek_options.x)
        {
        case 0:
            lseekReturn = lseek(outf, cpm_options.lseek_options.pos2, SEEK_SET);
            break;
        case 1:
            lseekReturn = lseek(outf, cpm_options.lseek_options.pos2, SEEK_END);
            break;
        case 2:
            lseekReturn = lseek(outf, cpm_options.lseek_options.pos2, SEEK_CUR);
            break;
        }

        if(lseekReturn == -1){
            FatalError('l', "CHYBA POZICIE outfile", 33);
        }

        char buf[1];
        for(unsigned int i = 0; i < cpm_options.lseek_options.num; i++){
            if(read(inf, buf, 1)!=0)
                write(outf, buf, 1);
        }
        
        close(inf);
        close(outf);

    }

    if(cpm_options.chmod){
        char buf[1000000];
        int inf;
        int outf;

        if(!(cpm_options.chmod_mode <= 511)){
            FatalError('m', "ZLE PRAVA", 34);
        }

        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('m', "SUBOR NEEXISTUJE", 34);
        }

        if((outf = open(cpm_options.outfile, O_WRONLY | O_CREAT)) == (-1)){
            FatalError('m', "INA CHYBA", 34);
        }

        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i);
        }

        if(chmod(cpm_options.outfile, cpm_options.chmod_mode) == -1){
            FatalError('m', "SUBOR NEBOL ZMAZANY", 26);
        }

        close(inf);
        close(outf);
    }
    
    if(cpm_options.inode){
        char buf[500000];
        int inf;
        int outf;

        struct stat stat_inf;
        stat(cpm_options.infile, &stat_inf);

        if(!S_ISREG(stat_inf.st_mode)){
            FatalError('i', "ZLY TYP VSTUPNEHO SUBORU", 27);
        }

        if(cpm_options.inode_number != stat_inf.st_ino){
            FatalError('i', "ZLY INOD", 27);
        }

        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('i', "INA CHYBA", 27);    
        }

        if((outf = open(cpm_options.outfile, O_WRONLY | O_CREAT | O_TRUNC)) == (-1)){
            FatalError('i', "INA CHYBA", 27);    
        }

        int i;
        while((i = read(inf, buf, 500000)) > 0){
            write(outf, buf, i);
        }

        close(inf);
        close(outf);

    }

    if(cpm_options.umask){
        int ifd, ofd, c;
        char buf[1000000];

        struct stat st;
        stat(cpm_options.outfile, &st);
        mode_t oldmode = st.st_mode;
        
        for(int i = 0; i < 10; i++){
            //for + operations
            if(cpm_options.umask_options[i][1] == '+'){
                switch (cpm_options.umask_options[i][0])
                {
                case 'u':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode |= 0100;
                        break;
                    case 'w':
                        oldmode |= 0200;
                        break;
                    case 'r':
                        oldmode |= 0400;
                        break;
                    }
                    break;
                case 'g':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode |= 0010;
                        break;
                    case 'w':
                        oldmode |= 0020;
                        break;
                    case 'r':
                        oldmode |= 0040;
                        break;
                    }
                    break;
                case 'o':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode |= 0001;
                        break;
                    case 'w':
                        oldmode |= 0002;
                        break;
                    case 'r':
                        oldmode |= 0004;
                        break;
                    }
                    break;
                default:
                    FatalError('u', "ZLE PRAVA", 32);
                }
        
            }
        //for - opeartions
        if(cpm_options.umask_options[i][1] == '-'){
            switch (cpm_options.umask_options[i][0])
                {
                case 'u':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode &= ~0100;
                        oldmode |= 0000;
                        break;
                    case 'w':
                        oldmode &= ~0200;
                        oldmode |= 0000;
                        break;
                    case 'r':
                        oldmode &= ~0400;
                        oldmode |= 0000;
                        break;
                    }
                    break;
                case 'g':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode &= ~0010;
                        oldmode |= 0000;
                        break;
                    case 'w':
                        oldmode &= ~0020;
                        oldmode |= 0010;
                        break;
                    case 'r':
                        oldmode &= ~0040;
                        oldmode |= 0040;
                        break;
                    }
                    break;
                case 'o':
                    switch (cpm_options.umask_options[i][2])
                    {
                    case 'x':
                        oldmode &= ~0001;
                        oldmode |= 0000;
                        break;
                    case 'w':
                        oldmode &= ~0002;
                        oldmode |= 0001;
                        break;
                    case 'r':
                        oldmode &= ~0004;
                        oldmode |= 0002;
                        break;
                    }
                    break;
            
                default:
                    FatalError('u', "ZLE PRAVA", 32);
                }
        }
        }


        umask(oldmode);
        ifd = open(cpm_options.infile, O_RDONLY);
        if((ofd = open(cpm_options.outfile, O_WRONLY | O_CREAT, oldmode)) == (-1)){
            FatalError('u', "INA CHYBA", 32);
        }

        while((c = read(ifd, buf, 1000000)) > 0){
            write(ofd, buf, c);
        }
 
        close(ifd);
        close(ofd);
        chmod(cpm_options.outfile, oldmode);
        return 0; 

    }

    if(cpm_options.link){
        
        int inf, outf;
        if((inf = open(cpm_options.infile, O_RDONLY) == (-1))){
            if(errno == EACCES){
                FatalError('K', "VSTUPNY SUBOR NEEXISTUJE", 30);
            }
            FatalError('K', "INA CHYBA", 30);
        }

        if((outf = open(cpm_options.outfile, O_RDONLY) != (-1))){
            if(errno == EACCES){
                FatalError('K', "VYSTUPNY SUBOR UZ EXISTUJE", 30);
            }
        }

        link(cpm_options.infile, cpm_options.outfile);
        close(inf);
        close(outf);

    }
    
    if(cpm_options.truncate){
        if(cpm_options.truncate_size < 0){
            FatalError('t', "ZAPORNA VELKOST", 31);
        }

        int inf, outf;
        if((inf = open(cpm_options.infile, O_RDWR)) == (-1)){
            FatalError('m', "INA CHYBA", 31);
        }
        
        if((outf = open(cpm_options.outfile, O_WRONLY | O_TRUNC)) == (-1)){
            FatalError('l', "INA CHYBA", 31);
        }

        char buf[1000000];
        int c;

        while ((c = read(inf, buf, 1000000)) > 0){
            write(outf, buf, c);
        }

        if((ftruncate(inf, cpm_options.truncate_size)) == (-1)){
            FatalError('t', "INA CHYBA", 31);
        }   

        close(inf);
        close(outf);    
    }

    if(!cpm_options.fast
        && !cpm_options.slow
        && !cpm_options.create
        && !cpm_options.overwrite
        && !cpm_options.append
        && !cpm_options.lseek
        && !cpm_options.directory
        && !cpm_options.delete_opt
        && !cpm_options.chmod
        && !cpm_options.inode
        && !cpm_options.umask
        && !cpm_options.link
        && !cpm_options.truncate
        && !cpm_options.sparse){
        char buf[500000];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('B', "SUBOR NEEXISTUJE", 21);
        }
        struct stat stat_inf;
        stat(cpm_options.infile, &stat_inf);
        if((outf = open(cpm_options.outfile, O_WRONLY | O_CREAT | O_TRUNC, stat_inf.st_mode)) == (-1)){
            FatalError('B', "INA CHYBA", 21);
        }
        int i;
        while((i = read(inf, buf, 500000)) > 0){
            write(outf, buf, i);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.delete_opt){
        char buf[1000000];
        int inf;
        int outf;
        if((inf = open(cpm_options.infile, O_RDONLY)) == (-1)){
            FatalError('d', "SUBOR NEEXISTUJE", 26);
        }
        struct stat stat_inf;
        stat(cpm_options.infile, &stat_inf);
        if((outf = open(cpm_options.outfile, O_WRONLY | O_TRUNC | O_CREAT, stat_inf.st_mode)) == (-1)){
            FatalError('d', "INA CHYBA", 26);
        }
        int i;
        while((i = read(inf, buf, 1000000)) > 0){
            write(outf, buf, i);
        }
        if(unlink(cpm_options.infile) == -1){
            FatalError('d', "SUBOR NEBOL ZMAZANY", 26);
        }
        close(inf);
        close(outf);
    }

    if(cpm_options.sparse){
        int ifd, ofd, c;
        char buf[1];
        int byte = 0;

        ifd = open(cpm_options.infile, O_RDONLY, S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP |
                S_IROTH | S_IWOTH);
        if((ofd = open(cpm_options.outfile, O_WRONLY | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP |
                S_IROTH | S_IWOTH)) == (-1))
            FatalError('S', "RIEDKY SUBOR NEVYTVORENY", 41);

        while((c = read(ifd, &buf, 1)) > 0){
            if(buf[0] == '\0'){
                lseek(ofd, 1, SEEK_CUR);
            } else {
                write(ofd, &buf, 1);
            }
        }

        struct stat st;
        stat(cpm_options.infile, &st);
        int byte1 = st.st_size;
        int res = byte1-byte;
        ftruncate(ofd, res);
        
        close(ifd);
        close(ofd);
        return 0;
    }

    // cpm_options.infile
    // cpm_options.outfile
    
    //-------------------------------------------------------------------
    // Vypis adresara
    //-------------------------------------------------------------------
    
    if (cpm_options.directory) {
        char path_buf[1000];
        getcwd(path_buf, sizeof(path_buf));


        if(path_buf != cpm_options.infile){
            int ifd = open(cpm_options.infile, O_RDONLY);
            if((fchdir(ifd)) == (-1)){
                if(errno == ENOTDIR)
                    FatalError('D', "VSTUPNY SUBOR NIE JE ADRESAR", 28);
                FatalError('D', "INA CHTBA", 28);
            }        
        }

        FILE *proc = popen("ls -l", "r");
        char buf[1024];
        
        FILE *ofd; 
        chdir(path_buf);
        ofd = fopen(cpm_options.outfile, "w");
        int i = 0;

        while (!feof(proc) && fgets(buf,sizeof(buf),proc)){   
            if(i < 1){
                i++;
                continue;
            }
            fprintf(ofd, "%s", buf);
        }
        fclose(ofd);
        pclose(proc);
    }
        
    //-------------------------------------------------------------------
    // Osetrenie prepinacov po kopirovani
    //-------------------------------------------------------------------
    
    // TODO Implementovat osetrenie prepinacov po kopirovani
    
    return 0;
}


void FatalError(char c, const char* msg, int exit_status)
{
    fprintf(stderr, "%c:%d:%s:%s\n", c, errno, strerror(errno), msg);
    exit(exit_status);
}

void PrintCopymasterOptions(struct CopymasterOptions* cpm_options)
{
    if (cpm_options == 0)
        return;
    
    printf("infile:        %s\n", cpm_options->infile);
    printf("outfile:       %s\n", cpm_options->outfile);
    
    printf("fast:          %d\n", cpm_options->fast);
    printf("slow:          %d\n", cpm_options->slow);
    printf("create:        %d\n", cpm_options->create);
    printf("create_mode:   %o\n", (unsigned int)cpm_options->create_mode);
    printf("overwrite:     %d\n", cpm_options->overwrite);
    printf("append:        %d\n", cpm_options->append);
    printf("lseek:         %d\n", cpm_options->lseek);
    
    printf("lseek_options.x:    %d\n", cpm_options->lseek_options.x);
    printf("lseek_options.pos1: %ld\n", cpm_options->lseek_options.pos1);
    printf("lseek_options.pos2: %ld\n", cpm_options->lseek_options.pos2);
    printf("lseek_options.num:  %lu\n", cpm_options->lseek_options.num);
    
    printf("directory:     %d\n", cpm_options->directory);
    printf("delete_opt:    %d\n", cpm_options->delete_opt);
    printf("chmod:         %d\n", cpm_options->chmod);
    printf("chmod_mode:    %o\n", (unsigned int)cpm_options->chmod_mode);
    printf("inode:         %d\n", cpm_options->inode);
    printf("inode_number:  %lu\n", cpm_options->inode_number);
    
    printf("umask:\t%d\n", cpm_options->umask);
    for(unsigned int i=0; i<kUMASK_OPTIONS_MAX_SZ; ++i) {
        if (cpm_options->umask_options[i][0] == 0) {
            // dosli sme na koniec zoznamu nastaveni umask
            break;
        }
        printf("umask_options[%u]: %s\n", i, cpm_options->umask_options[i]);
    }
    
    printf("link:          %d\n", cpm_options->link);
    printf("truncate:      %d\n", cpm_options->truncate);
    printf("truncate_size: %ld\n", cpm_options->truncate_size);
    printf("sparse:        %d\n", cpm_options->sparse);
}
