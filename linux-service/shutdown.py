securitykey = "securitykey"


from socket import socket, gethostbyname, AF_INET, SOCK_DGRAM
import sys
import os

#------------------socket stuff
PORT_NUMBER = 50000
SIZE = 1024

hostName = gethostbyname( '0.0.0.0' )

mySocket = socket( AF_INET, SOCK_DGRAM )
mySocket.bind( (hostName, PORT_NUMBER) )

print ("Server listening on port {0}\n".format(PORT_NUMBER))
#------------------socket stuff

while True:
        (data,addr) = mySocket.recvfrom(SIZE)
        data = data.decode('utf-8')

        #check the recived data
        if str(data) == "poweroff-" + securitykey:
                os.system("poweroff")
sys.ext()