FROM eclipse-temurin:21-alpine

ARG VVER=4.0.0
ARG STVER=13.0

WORKDIR /opt/showvoc

ADD https://bitbucket.org/art-uniroma2/showvoc/downloads/showvoc-${VVER}-full.zip .

RUN unzip showvoc-${VVER}-full.zip

EXPOSE 1983

WORKDIR /opt/showvoc/semanticturkey-${STVER}

CMD ["sh", "./bin/semanticturkey.sh"]