import React from "react";
import { ProfileInterface } from "../common/AppInterface";
import { getVisitProfile } from "../common/Until";
import { loadRelationShipToStorage, loadStartDayInStorage } from "../untils/RelationShipUntil";

export function stateManagement(this: any){
    const [profileLover, setProfileLover] = React.useState<ProfileInterface | null>(null);
    const [loadProfile, setLoadProfile] = React.useState<boolean>(true);
    const [countDay, setCountDay] = React.useState<number>(0);

    this.profileLover = profileLover;
    this.setProfileLover = setProfileLover;
    this.loadProfile = loadProfile;
    this.setLoadProfile = setLoadProfile;
    this.countDay = countDay;
    this.setCountDay = setCountDay;

    const syncProfileLover = async () => {
        let userId = await loadRelationShipToStorage("lover");
        let startDay = await loadStartDayInStorage("lover");
        if(startDay){
            let date = new Date(startDay);
            let now = Date.now();
            const diff = (now - date.getTime()) / (1000 * 3600 * 24);
            this.setCountDay(parseInt(diff));
        }
        if(userId){
            let resultProfile = await getVisitProfile(parseInt(userId));
            if(resultProfile)
                this.setProfileLover(resultProfile.profile);
        }
        this.setLoadProfile(false);
    }
    
    React.useEffect(() => {
        syncProfileLover()
    }, []);
}

