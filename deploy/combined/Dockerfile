FROM eclipse-temurin:21-alpine

ARG VBVER=13.0.0
ARG STVER=13.0

WORKDIR /opt/showvoc

ADD https://bitbucket.org/art-uniroma2/vocbench3/downloads/vocbench3-${VBVER}-full.zip .

RUN unzip vocbench3-${VBVER}-full.zip

EXPOSE 1979

WORKDIR /opt/showvoc/semanticturkey-${STVER}

CMD ["sh", "./bin/semanticturkey.sh"]