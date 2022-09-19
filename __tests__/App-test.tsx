/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import App from '../App';
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import { ApiRequest } from '../src/common/ApiRequest';
 import { getListFriend, getListPost, getVisitProfile, sendPost, deletePost, getListChat, updatePost, checkUUIDRegex, sendRelationShip } from '../src/common/Until';
 import { PaginateInterface, VisitProfile } from '../src/common/AppInterface';
 import axios from 'axios';
 import { getCacheUser } from '../src/common/LocalCache';
 import { RelationShipEnum } from '../src/common/AppEnum';
 jest.spyOn(axios, 'post');
 jest.spyOn(axios, 'get');
 jest.setTimeout(30000);
 
 beforeAll(() => {
   ApiRequest.token = "H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV";
   ApiRequest.applicationId = "10";
 });
 
 describe('TEST API', () => {
   test('profile', async () => {
     //check profile
     let r: VisitProfile | null = await getVisitProfile(5);
     expect(r?.friends).not.toBeUndefined();
     expect(r?.friends).not.toBeNull();
     expect(r?.friends).not.toBeNaN();
     expect(r?.posts).not.toBeUndefined();
     expect(r?.posts).not.toBeNull();
     expect(r?.posts).not.toBeNaN();
     expect(r).toHaveProperty('profile.id', 5);
     //check profile not found
     let r1 = await getVisitProfile(-1);
     expect(r1).toBeNull();
     let cacheUser = getCacheUser(5);
     expect(r).toEqual(cacheUser);
     let cacheUserNotFound = getCacheUser(-1);
     expect(cacheUserNotFound).toBeUndefined();
   });
   test('message', async () => {
     //get list message
     let r: PaginateInterface | null = await getListChat()
     expect(r).not.toBeNull()
   });
   test('friend', async () => {
     //get list friend
     let r: PaginateInterface | null = await getListFriend();
     expect(r).not.toBeNull();
     expect(r?.data[0]).toHaveProperty('id', 5);
   });
 
   test('post', async () => {
     //check create post
     let r: string | null = await sendPost(`Lorem ipsum dolor sit amet, omittam patrioque cu qui, eu mea similique definitionem. 
       Et nam posse ceteros. Legere lucilius voluptatibus ut nec, est augue soleat regione te. 
       Ex affert doming duo, postea ponderum gubergren mei at, altera labores at ius. Quo et tacimates mediocrem suavitate.`);
     expect(r).not.toBeNull();
     if (!r) return
     expect(checkUUIDRegex(r)).toBe(true);
     //check get list post
     let rList: PaginateInterface | null = await getListPost();
     expect(rList).not.toBeNull();
     //check post is create success
     let count = 0;
     rList?.data.forEach(value => {
       if(value['UUID'] == r) count++;
     })
     expect(count).not.toBe(0);
     //check update post
     let contentUpdate = `update content ${r}`;
     let rUpdate: boolean = await updatePost(r, contentUpdate);
     expect(rUpdate).toBe(true);
     //check update post success
     rList = await getListPost();
     count = 0;
     rList?.data.forEach(value => {
       if(value['UUID'] == r && value['content'] == contentUpdate) count++;
     });
     expect(count).not.toBe(0);
     //check update with content null
     rUpdate = await updatePost(r, null);
     expect(rUpdate).toBe(false);
     //check update with content empty
     rUpdate = await updatePost(r, "");
     expect(rUpdate).toBe(false);
     //check update with uuid is empty
     rUpdate = await updatePost("", "");
     expect(rUpdate).toBe(false);
     //check get list post of other user
     let rOtherList: PaginateInterface | null = await getListPost(0, 1, 5);
     expect(rOtherList).not.toBeNull();
     //check delete post
     let r1: boolean = await deletePost(r);
     expect(r1).toBe(true);
   });
 
   test("relation", async () => {
     let r: boolean | null = await sendRelationShip(5, RelationShipEnum.request);
     expect(r).toBe(true);
     r = await sendRelationShip(-1, RelationShipEnum.confirm);
     expect(r).toBe(false);
     r = await sendRelationShip(5, RelationShipEnum.confirm);
     expect(r).toBe(true);
   });
 });