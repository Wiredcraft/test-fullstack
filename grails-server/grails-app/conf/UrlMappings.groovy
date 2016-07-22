class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/verify"(controller: "app", action: "verify", method: "post")

        "/user"(controller: "app", action: "createUser", method: "post")
        "/user/$username"(controller: "app", action: "getUser", method: "get")
        "/talk"(controller: "app", action: "createTalk", method: "post")
        "/talk/$talkId/vote"(controller: "app", action: "voteTalk", method: "post")
        "/talks"(controller: "app", action: "listTalks", method: "get")
        "/i/**"(view: "index")
	}
}
