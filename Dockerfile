FROM python:3.11

ARG DEBIAN_FRONTEND=noninteractive

COPY api /alexa/api
COPY fauxmo/config.json /alexa/fauxmo/config.json
COPY requirements.txt /alexa
COPY run.sh /alexa
COPY LICENSE /alexa

WORKDIR /alexa

RUN pip3 install -r requirements.txt

RUN chmod a+x run.sh

CMD ["./run.sh"]