
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {now} from 'moment';
import {generateId} from './helper';

const ID_LENGTH = 28;
export const ERROR_ROOM_BLOCK = 1;
export const ERROR_ROOM_REMOVE = 2;

const FirebaseStore = {
    // User
    async getUserProfile(uid){
        let result =
            await firestore()
            .collection(`users`)
            .doc(uid)
            .get();

        if (result) {
            return result.data();
        }
        return null;
    },

    async registerUserProfile(uid, profile){
        await firestore()
            .collection(`users`)
            .doc(uid)
            .set(profile);
    },

    setUserAvatar(uid, avatar, successCallback, failCallback){
        storage()
            .ref(uid)
            .putFile(avatar.url)
            .then(async () => {
                console.log('Image uploaded to the bucket!');
                try{
                    let url = await storage()
                        .ref('/' + uid)
                        .getDownloadURL();
                    successCallback(url);
                } catch (e){
                    failCallback();
                }

            }). catch((e) => {
                console.log('uploading image error => ', e);
                failCallback();
            })
    },

    async setUserProfile(uid, profile){
        let userRef = await firestore().collection('users').doc(uid);
        await userRef.set({
            ...profile
        }, { merge: true});
    },

    async getCategories(){
        let categories = await firestore().collection('categories').get();
        categories = categories.docs.map(doc => { return {id: doc.id, ...doc.data()}}).sort((a,b) => a.order > b.order);
        let category_data = [];
        for(let i = 0; i< categories.length; i++){
            let category = categories[i];
            let forums = await firestore().collection('forums').where("categoryId", "==", category.id).get();
            if(forums.docs.length){
                forums = forums.docs.map(doc => doc.data()).sort((a, b) => b.createdAt - a.createdAt);
            } else {
                forums = [];
            }
            category_data.push({...category, forums: forums});
        }
        return category_data;
    },

    async getRelationshipCategory(){
        let relationship = await firestore().collection('categories').where("title", "==", "RELATIONSHIPS").get();
        if(relationship.docs.length){
            let relationship_id = relationship.docs[0].id;
            relationship = relationship.docs[0].data();
            let forums = await firestore().collection('forums').where("categoryId", "==", relationship_id).get();
            if(forums){
                forums = forums.docs.map(doc => doc.data()).sort((a, b) => b.createdAt - a.createdAt);
                return {id: relationship_id, ...relationship, forums: forums};
            }
        }
        return null;
    },

    async getForums(uid){
        let forums = await firestore().collection('forums').where("ownerId", "==", uid).get();
        if(forums.docs.length){
            forums = forums.docs.map(doc => doc.data()).sort((a, b) => b.createdAt - a.createdAt);
            return forums;
        }
        return [];
    },

    async getAffirmations(){
        let now = new Date();
        let todayStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,  0, 0, 0).valueOf();
        let affirmations = await firestore().collection('affirmations').where('createdAt', '>', todayStartTime).get();
        if(affirmations.docs.length){
            affirmations = affirmations.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a, b) => b.createdAt - a.createdAt);
            return affirmations;
        }
        return [];
    },

    async getCategory(categoryId, uid = null){
        let category = await firestore().collection('categories').doc(categoryId).get();
        if(!category){
            return null;
        }
        category = category.data();

        let forums = null;
        if(uid === null){
            forums = await firestore().collection('forums').where("categoryId", "==", categoryId).get();
        } else {
            forums = await firestore().collection('forums').where("ownerId", "==", uid).where("categoryId", "==", categoryId).get();
        }
        if(forums.docs.length){
            forums = forums.docs.map(doc => doc.data()).sort((a, b) => b.createdAt - a.createdAt);
        } else {
            forums = [];
        }
        return {id: categoryId, ...category, forums: forums};
    },

    // Forum
    async createForum(user, forum){
        let forum_id = generateId(ID_LENGTH);
        let data = {
            id: forum_id,
            title: forum.title,
            text: forum.text,
            categoryId: forum.categoryId,
            ownerId: user.uid,
            ownerName: user.profile.displayName,
            createdAt: now(),
            updatedAt: now()
        }
        return await firestore().collection('forums').doc(forum_id).set(data);
    },

    async setForumBookmark(userId, forum_id, isBookmarked){
        let forum = await firestore().collection('forums').doc(forum_id).get();
        if(forum){
            forum = forum.data();
            let newBookmarked = [...(forum.bookmarked??[])];
            if(isBookmarked){
                newBookmarked.push(userId);
            } else {
                newBookmarked = newBookmarked.filter(item => item !== userId);
            }
            let newForum = {...forum, bookmarked: newBookmarked};
            await firestore().collection('forums').doc(forum_id).set(newForum);
        }
    },

    async setLastVist(forum_id){
        let newForumData = {
            lastVisit: now()
        }
        await firestore().collection('forums').doc(forum_id).set(newForumData, { merge: true });
    },

    async setReply(user, forum_id, content){
        let reply_id = generateId(ID_LENGTH);
        let data = {
            id: reply_id,
            ownerId: user.uid,
            text: content,
            tmid: forum_id,
            ownerName: user.profile.displayName,
            createdAt: now()
        }
        await firestore().collection('replies').doc(reply_id).set(data);
        let forum = await firestore().collection('forums').doc(forum_id).get();
        if(forum) {
            forum = forum.data();
            await firestore().collection('forums').doc(forum_id).set({ comments: [...(forum.comments??[]), {userId: user.uid, createdAt: now()}], updatedAt: now()}, { merge: true});
        }
    },

    async setInnerReply(user, reply_id, content){
        let reply = await firestore().collection('replies').doc(reply_id).get();
        if(reply) {
            reply = reply.data();
            let data = {
                replies: [...(reply.replies ?? []), {
                    ownerId: user.uid,
                    ownerName: user.profile.displayName,
                    text: content,
                    createdAt: now()
                }]
            };
            await firestore().collection('replies').doc(reply_id).set(data, {merge: true});
        }
    },

    async getForumReplies(forum_id){
        let replies = await firestore().collection('replies').where("tmid", "==", forum_id).get();
        if(replies.docs.length){
            replies = replies.docs.map(doc => doc.data()).sort((a, b) => b.createdAt - a.createdAt);
            return replies;
        }
        return [];
    },

    async getRoom(userId1, userId2){
        let room = await firestore().collection('rooms').where('users', 'in', [[userId1, userId2], [userId2, userId1]]).get();
        if(!room.docs.length || room.docs[0].data().deleted){
            let room_id = generateId(ID_LENGTH);
            let lastSeen = {};
            lastSeen[userId1] = now();
            lastSeen[userId2] = now();
            room = {
                id: room_id,
                users: [userId1, userId2],
                lastSeen: lastSeen,
                createdAt: now(),
            }
            await firestore().collection('rooms').doc(room_id).set(room);
        } else {
            room = room.docs[0].data();
        }

        let other = await firestore().collection('users').doc(userId2).get();
        return {...room, o: other.data()}
    },

    async getRoomById(rid){
        let room = await firestore().collection('rooms').doc(rid).get();
        if(room){
            return room.data();
        }
        return null;
    },

    async setRoomAction(rid, roomData){
        await firestore().collection('rooms').doc(rid).set(roomData, {merge: true});
    },

    async userLeftRoom(userId, roomId){
        let room = await firestore().collection('rooms').doc(roomId).get();
        if(room){
            room = room.data();
            let lastSeen = { ...room.lastSeen};
            lastSeen[userId] = now();
            await firestore().collection('rooms').doc(roomId).set({
                lastSeen: lastSeen
            }, {merge: true});
        }
    },

    async deleteRoom(roomId){
        await firestore().collection('rooms').doc(roomId).delete();
    },

    async getUserRooms(userId){
        let rooms = await firestore().collection('rooms').get();
        if(!rooms.docs.length){
            return [];
        }
        let userRooms = rooms.docs.map(doc => doc.data()).filter(item => item.users.includes(userId) && item.deleted !== userId);
        let retRooms = [];
        for(let i =0; i < userRooms.length; i++){
            let room = userRooms[i];
            let otherUserId = room.users.find(id => id !== userId);
            let user = await firestore().collection('users').doc(otherUserId).get();

            let unreadCount = 0;
            let userLastSeen = room.lastSeen[userId];
            try{
                let unreadMessages = await firestore().collection('messages').where('createdAt', '>', new Date(userLastSeen)).get();
                unreadCount = unreadMessages.docs.filter((doc) => doc.data().rid === room.id).length;
            } catch (e){}

            if(user){
                retRooms.push({...room, o: user.data(), unread: unreadCount});
            } else {
                retRooms.push({ ...room,  unread: unreadCount});
            }
        }
        return retRooms;
    },

    async getMessages(rid){
        let messages = await firestore().collection('messages').where('rid', '==', rid).get();
        if(!messages.docs.length){
            return [];
        }
        return messages.docs.map(doc => {
            let message = doc.data();
            return { ...message, createdAt: new Date(message.createdAt.seconds * 1000)};
        }).sort((a, b) => a.createdAt < b.createdAt);
    },

    async saveMessages(rid, messages){
        try{
            let room = await firestore().collection('rooms').doc(rid).get();
            if(room){
                room = room.data();
                if(room.block && room.block.length > 0){
                    return { success: false, errorType: ERROR_ROOM_BLOCK, errorMsg: 'Room is blocked!'};
                }
            } else {
                return { success: false, errorType: ERROR_ROOM_REMOVE, errorMsg: 'Room is deleted!'};
            }
        } catch(e){
        }
        for(let i=0; i < messages.length ; i++){
            const message = { ...messages[i], rid};
            await firestore().collection('messages').doc(message._id).set(message);
        }
        let lastMessage = messages[messages.length - 1];
        await firestore().collection('rooms').doc(rid).set({
            lastMessage: lastMessage
        }, { merge: true });
        return {success: true};
    },

    async saveFeedBack(uid, userName, feedback){
        let feedback_id = generateId(ID_LENGTH);
        let data = {
            id: feedback_id,
            ownerId: uid,
            ownerName: userName,
            ...feedback,
            createdAt: now()
        }
        await firestore().collection('feedbacks').doc(feedback_id).set(data);
    },


}

export default FirebaseStore;
