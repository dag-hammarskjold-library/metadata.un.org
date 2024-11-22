# Docker Build for Ontotext GraphDB

This is a basic Docker build that attempts to supply to GraphDB the particular
requirements we're using in Vocbench.

These include:
1. st-changetracking-sail-<version>.jar for history and validation
2. st-trivial-inference-sail-<version>.jar for inference 
3. The Lucene FTS plugin.