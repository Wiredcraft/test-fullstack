package grails.server

import grails.converters.JSON

import javax.servlet.http.HttpServletResponse

class AppController {

    /**
     * verify a user if matched the username and password
     * @return
     */
    def verify(){
        String username = params.username
        String password = params.password

        def user = User.findByUsernameAndPassword(username, password)
        if(!user){
            render ([success: false, message: "Username or password is incorrect."] as JSON)
            return
        }
        render ([success: true, username: username] as JSON)
    }

    /**
     * create user with given username and password
     * @return
     */
    def createUser() {
        String username = params.username
        String password = params.password
        String confirmPassword = params.confirmPassword
        if(!password.equals(confirmPassword)){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST)
            return
        }
        User user = User.findByUsername(username)
        if(user){
            render ([success: false, message: "User is already existed."] as JSON)
            return
        }
        try{
            user = new User()
            user.username = username
            user.password = password
            user.save(failOnError: true)
            render ([
                    success: true,
                    username: username
            ] as JSON)
            return
        } catch(Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN)
            return
        }
    }

    /**
     * get user information with talks user published
     * @param id user id
     * @return
     */
    def getUser(String username) {
        def user = User.findByUsername(username)
        if(!user) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND)
            return
        }
        def talks = Talk.findAllByPublisher(user)
        render ([
                username: user.username,
                talks: talks.collect {it.toMap()}
        ] as JSON)
    }

    /**
     * create a talk with given params
     * @return
     */
    def createTalk() {
        String username = params.username
        String title = params.title
        String description = params.description
        String speaker = params.speaker
        String coverURL = params.coverURL
        String url = params.url
        try{
            Talk talk = new Talk()
            talk.title = title
            talk.description = description
            talk.speaker = speaker
            talk.coverURL = coverURL
            talk.talkURL = url
            talk.publisher = User.findByUsername(username)
            talk.publishDate = new Date()
            talk.save(failOnError: true)
            render ([success: true] as JSON)
        } catch(Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN)
            return
        }
    }

    /**
     * list the all talks
     * @return
     */
    def listTalks(){
        render ([talks: Talk.list().collect {it.toMap()}] as JSON)
    }

    /**
     * vote the talk with given userId
     * @param talkId
     * @param userId
     */
    def voteTalk(long talkId) {
        String username = params.username
        def user = User.findByUsername(username)
        if(!user) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND)
            return
        }
        def talk = Talk.findById(talkId)
        if(!user) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND)
            return
        }
        if(VoteHistory.findByTalkAndUser(talk, user)){
            render ([
                    success: false,
                    message: "Already voted to the talk."
            ] as JSON)
            return
        }
        try{
            new VoteHistory(
                    talk: talk,
                    user: user
            ).save(failOnError: true)
            render ([success: true] as JSON)
        } catch(Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN)
            return
        }
    }




}
