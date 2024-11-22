FROM maven:eclipse-temurin as builder

ENV VERS=13.0

WORKDIR /app/st-changetracking/
ADD https://repo1.maven.org/maven2/it/uniroma2/art/semanticturkey/st-changetracking-sail/${VERS}/st-changetracking-sail-${VERS}.pom pom.xml
RUN mvn clean package -DskipTests

WORKDIR /app/st-inference/
ADD https://repo1.maven.org/maven2/it/uniroma2/art/semanticturkey/st-trivial-inference-sail/${VERS}/st-trivial-inference-sail-${VERS}.pom pom.xml
RUN mvn clean package -DskipTests

FROM ontotext/graphdb:10.6.2

ARG graphdb_parent_dir=/opt/graphdb

ENV GRAPHDB_HOME=${graphdb_parent_dir}/home
ENV GRAPHDB_INSTALL_DIR=${graphdb_parent_dir}/dist
ENV PATH=${GRAPHDB_INSTALL_DIR}/bin:$PATH


WORKDIR ${GRAPHDB_INSTALL_DIR}/lib

COPY --from=builder /app/st-changetracking/target/*.jar .
COPY --from=builder /app/st-inference/target/*.jar .

WORKDIR ${GRAPHDB_INSTALL_DIR}/lib/plugins

ADD https://bitbucket.org/art-uniroma2/semantic-turkey/downloads/lucene-fts-plugin-graphdb-plugin.zip .
RUN unzip lucene-fts-plugin-graphdb-plugin.zip

WORKDIR ${graphdb_parent_dir}

ENTRYPOINT [ "/opt/graphdb/dist/bin/graphdb" ] 

CMD ["-Dgraphdb.home=/opt/graphdb/home", "-Dgraphdb.distribution=docker"]

EXPOSE 7200
EXPOSE 7300