import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { CommandInvoker } from "../command/Command";
import { SaveProfileCommand } from "../command/SaveProfileCommand";
import { ProfileInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import EditProfileForm from "../components/forms/EditProfileForm";
import AppLayout from "../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { stateManagement } from "../sevices/EditProfileServices";
export default function ProfileEditScreen(this: any){
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    stateManagement.call(this);
    let saveProfileCommand = new SaveProfileCommand(this);
    
    const onSavePress = (name: string, email: string, description: string) => CommandInvoker(saveProfileCommand, {id: profile.id, name, email, description});
    return <AppLayout alterStatus={this.alterStatus} alterID={this.alterId} alterMessage={this.alter}>
        <View style={[AppStyle.center, AppStyle.p3, {paddingTop: 25}]}>
            <EditProfileForm  
                onSavePress={onSavePress} 
                profile={profile} 
                errorName={this.errorName}
                errorEmail={this.errorEmail}
                errorDescription={this.errorDescription}
            />
        </View>
    </AppLayout>
}