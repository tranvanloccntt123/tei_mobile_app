import { CommonMediaInterface, ScreenInterface } from "../common/AppInterface";
import React from "react";
import { DEV_BACKGROUND } from "../assets/images";
import ProfileLayout from "../components/profile/layouts/ProfileBasicLayout";
import { onHandleRelationShip, stateManagement, useCheckRelationShip, useLoadPost, useLoadProfile, useProfileSevices } from "../sevices/ProfileServices";
export default function ProfileScreen(this: any, props: ScreenInterface){
    useLoadProfile();
    const user_id: number = props.route? props.route.id? props.route.id : 1 : 1;
    stateManagement.call(this, user_id);
    useProfileSevices.call(this);
    useLoadPost.call(this);
    useCheckRelationShip.call(this);
    const common:Array<CommonMediaInterface> = Array.from({length: 10}, (_, i) => {
        return {
            id: i,
            image: DEV_BACKGROUND
        }
    });
    const handleRelationShip = async () => {
        let newRelation = await onHandleRelationShip(user_id, this.relationShip, this.setRelationShip);
        return newRelation;
    }
    return this.current? <ProfileLayout 
        user={this.current}
        data={this.posts} 
        friends={this.friends}
        commonMedia={common}
        countFriend={this.countFriend}
        countPost={this.countPost}
        LoadPostFunction={() => this.setIsLoad(true)}
        relationShip={this.relationShip}
        handleRelationShip={handleRelationShip}
        isVisit={this.isVisit}
    /> : null
}