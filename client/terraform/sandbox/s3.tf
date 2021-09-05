resource "aws_s3_bucket" "wiredcraftcc_host" {
    bucket = "sanbox-wiredcraftcc.com"
    acl    = "public-read"

    website {
        index_document = "index.html"
        error_document = "index.html" //we will change this as soon as we have a error.html
    }
}