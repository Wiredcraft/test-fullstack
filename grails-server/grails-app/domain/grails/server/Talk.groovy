package grails.server

class Talk {

    String title

    String description

    String speaker

    String coverURL

    String talkURL

    Date publishDate

    User publisher

    static constraints = {

    }

    /**
     * render the talk as a map
     * @return
     */
    public HashMap<String, ?> toMap(){
        [
                id: id,
                title: title,
                description: description,
                speaker: speaker,
                coverURL: coverURL,
                talkURL: talkURL,
                voteCount: VoteHistory.countByTalk(this),
                publishDate: publishDate.format('YYYY-MM-dd hh:mm:ss'),
                publisher: publisher.username
        ]
    }
}
