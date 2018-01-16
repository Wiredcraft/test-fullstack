import { ADD_TALK } from './actionTypes'

export function addTalk(allTalks, talk) {
    return {
        type: ADD_TALK,
        allTalks: allTalks,
        talk: talk
    }
}
