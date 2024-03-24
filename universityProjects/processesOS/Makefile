OUTPUT=zadanie proc_p1 proc_p2 proc_t proc_d proc_serv2
CC=g++
SOURCES=zadanie.cpp proc_p1.cpp proc_p2.cpp proc_t.cpp proc_d.cpp proc_serv2.cpp

all: codeanalysis $(OUTPUT)
	
codeanalysis: $(SOURCES)
	cppcheck --enable=all $^

zadanie: zadanie.cpp
	$(CC) $^ -o $@

proc_p1: proc_p1.cpp
	$(CC) $^ -o $@
	
proc_p2: proc_p2.cpp
	$(CC) $^ -o $@

proc_t: proc_t.cpp
	$(CC) $^ -o $@

proc_d: proc_d.cpp
	$(CC) $^ -o $@

proc_serv2: proc_serv2.cpp
	$(CC) $^ -o $@

clean: 
	rm -rf *.out *.err $(OUTPUT)