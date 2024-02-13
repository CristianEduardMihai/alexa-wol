from socket import socket, AF_INET, SOCK_DGRAM

offSocket = socket( AF_INET, SOCK_DGRAM )
poweroff_security_key = "securitykey"
ip = "127.0.0.1"
udp_port = 50000
offSocket.sendto(f"poweroff-{poweroff_security_key}".encode('utf-8'),(ip,udp_port))

# pip install sockets