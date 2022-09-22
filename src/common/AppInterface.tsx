import { ImageSourcePropType } from "react-native"
import { RelationShipEnum } from "./AppEnum"

export interface BaseApiResponseInterface{
    id: number, 
    uuid?: string,
    updated_at?: string
    created_at?: string
}
export interface GroupChatInterface extends BaseApiResponseInterface{
    name: string,
    avatar?: string
}
export interface UserInterface extends BaseApiResponseInterface{
    name: string,
    avatar?: ImageSourcePropType,
    background?: ImageSourcePropType
}
export interface GroupChatUserInterface extends BaseApiResponseInterface{
    user: UserInterface
    group: GroupChatInterface
    avatar?: string
}
export interface GroupMessageInterface extends BaseApiResponseInterface{
    group_message_id: number
    type: string
    content: any
    user: UserInterface
}
export interface ProfileInterface extends BaseApiResponseInterface{
    name: string,
    email?: string,
    avatar?: string | ImageSourcePropType,
    background?: string | ImageSourcePropType
}
export interface PostInterface extends BaseApiResponseInterface{
    content: string,
    image?: string,
    video?: string,
    user: UserInterface,
}

export interface VisitProfile{
    posts: number,
    friends: number,
    profile: ProfileInterface
}
export interface PaginateDetailInterface{
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
}
export interface PaginateLinkInterface{
    first: string
    last: string
    prev?: any
    next?: any
}
export interface PaginateInterface{
    data: Array<any>
    pagination: PaginateDetailInterface
    links: PaginateLinkInterface
}

export interface ResponseInterface{
    message: any,
    status: string
}

export interface CommonMediaInterface extends BaseApiResponseInterface{
    image: ImageSourcePropType
}

export interface ScreenInterface{
    navigation?: any,
    route?: any
}

export interface CheckRelationInterface{
    status: RelationShipEnum,
    personRequest: boolean
}