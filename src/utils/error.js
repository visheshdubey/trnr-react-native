[
    // EMAIL ERROR
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": null,
                    "customerUserErrors": [
                        {
                            "field": [
                                "input",
                                "email"
                            ],
                            "message": "Email has already been taken",
                            "code": "TAKEN"
                        }
                    ]
                }
            }
        }
    },
    //LIMIT EXCEED
    {
        "data": {
            "data": {
                "customerCreate": null
            },
            "errors": [
                {
                    "message": "Creating Customer Limit exceeded. Please try again later.",
                    "locations": [
                        {
                            "line": 3,
                            "column": 3
                        }
                    ],
                    "path": [
                        "customerCreate"
                    ]
                }
            ]
        }
    },
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": null,
                    "customerUserErrors": [
                        {
                            "field": [
                                "input",
                                "email"
                            ],
                            "message": "Email has already been taken",
                            "code": "TAKEN"
                        }
                    ]
                }
            }
        }
    },
    //Success log
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": {
                        "id": "gid://shopify/Customer/6144260702360",
                        "firstName": "Vishesh",
                        "lastName": null,
                        "email": "sabgrowth@gmail.com",
                        "acceptsMarketing": true
                    },
                    "customerUserErrors": []
                }
            }
        }
    },
    //ERROR WHILE CREATING CUSTOMER

]