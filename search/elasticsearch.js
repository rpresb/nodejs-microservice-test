var elasticsearch = require('elasticsearch'),
    config = require('config');

var elasticClient = new elasticsearch.Client(config.elasticsearch);

/**
* Delete an existing index
*/
function deleteIndex(indexName) {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex(indexName) {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists(indexName) {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function addDocument(indexName, document) {
    elastic.indexExists(indexName).then(function (exists) {
        if (!exists) {
            elastic.initIndex(indexName);
        }
    });

    return elasticClient.index({
        index: indexName,
        type: "document",
        body: document
    });
}
exports.addDocument = addDocument;