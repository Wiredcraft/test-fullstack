resource "aws_cloudfront_distribution" "wiredcraftcc_host" {
    
    origin {
      domain_name = "${aws_s3_bucket.wiredcraftcc_host.bucket_regional_domain_name}"
      origin_id   = "${aws_s3_bucket.wiredcraftcc_host.id}"
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"

    default_cache_behavior {
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = "${aws_s3_bucket.wiredcraftcc_host.id}"

      forwarded_values {
        query_string = false

        cookies {
          forward = "none"
        }
      }

      viewer_protocol_policy = "redirect-to-https"
      min_ttl                = 0
      default_ttl            = 3600
      max_ttl                = 86400
    }

    # Cache behavior with precedence 0
    ordered_cache_behavior {
      path_pattern     = "/content/immutable/*"
      allowed_methods  = ["GET", "HEAD", "OPTIONS"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = "${aws_s3_bucket.wiredcraftcc_host.id}"

      forwarded_values {
        query_string = false
        headers      = ["Origin"]

        cookies {
          forward = "none"
        }
      }

      min_ttl                = 0
      default_ttl            = 86400
      max_ttl                = 31536000
      compress               = true
      viewer_protocol_policy = "redirect-to-https"
    }

    # Cache behavior with precedence 1
    ordered_cache_behavior {
      path_pattern     = "/content/*"
      allowed_methods  = ["GET", "HEAD", "OPTIONS"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = "${aws_s3_bucket.wiredcraftcc_host.id}"

      forwarded_values {
        query_string = false

        cookies {
          forward = "none"
        }
      }

      min_ttl                = 0
      default_ttl            = 3600
      max_ttl                = 86400
      compress               = true
      viewer_protocol_policy = "redirect-to-https"
    }

    price_class = "PriceClass_200"

    restrictions {
      geo_restriction {
        restriction_type = "none"
      }
    }

    tags = {
      Environment = "sandbox"
    }

    viewer_certificate {
    cloudfront_default_certificate = true
  }
}