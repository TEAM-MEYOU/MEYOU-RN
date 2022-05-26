import React, { useState } from 'react';
import OptionView from '@components/OptionView';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { GreyTitle } from '@components/Text/GreyTitle';
import { BigTitle } from '@components/Text/BigTitle';
import { useFetchUser } from '@hooks/queries';
import { css } from '@emotion/native';
import UserProfileImage from '@components/UserProfileImage';
import BottomCTA from '@components/BottomCTA';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import useAWS from '@hooks/useAWS';
import { Member, updateMember } from '@apis/member';
import { useQueryClient } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OptionStackNavigator } from '@navigation/OptionNavigation';
import KeyboardHide from '@components/KeyboardHide';

function ProfileChangeScreen({ navigation }: NativeStackScreenProps<OptionStackNavigator, 'ProfileChange'>) {
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();
  const aws = useAWS();
  const [nickName, setNickName] = useState(() => fetchUser.data?.coupleInfo?.nickname);
  const [url, setUrl] = useState(() => fetchUser.data?.coupleInfo?.imageUrl);
  const [fileName, setFileName] = useState('');

  const handlePressChangeImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      const ImageUri = result.assets ? result.assets[0].uri : url;
      setUrl(ImageUri);
      result.assets && setFileName(result.assets[0].fileName!);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePressChange = async () => {
    try {
      if (url !== fetchUser.data?.coupleInfo?.imageUrl) {
        const resizedImage = await ImageResizer.createResizedImage(url!, 300, 300, 'JPEG', 100);
        await aws.upload(url!, fileName, fetchUser.data!.id);
      }
      if (nickName !== fetchUser.data?.coupleInfo?.nickname) {
        const member: Partial<Member> = { ...fetchUser.data!.coupleInfo, nickname: nickName };
        await updateMember(member);
        await queryClient.invalidateQueries('user');
      }
      navigation.navigate('Option');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <OptionView>
      <KeyboardHide>
        <View
          style={css`
            flex: 1;
          `}>
          <GreyTitle>프로필 변경</GreyTitle>
          <BigTitle>{`상대방의 프로필을\n변경해 보세요`}</BigTitle>
          <View
            style={css`
              margin-top: 20px;
              align-items: center;
            `}>
            <TouchableOpacity onPress={handlePressChangeImage}>
              <UserProfileImage url={url} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
            <TextInput
              style={css`
                width: 100px;
                font-weight: 500;
                font-size: 16px;
                text-align: center;
                margin-top: 5px;
                padding: 5px;
                border-bottom-width: 2px;
              `}
              value={nickName}
              onChangeText={setNickName}
              maxLength={5}
              placeholder={'별명'}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <BottomCTA onPress={handlePressChange}>변경</BottomCTA>
        </View>
      </KeyboardHide>
    </OptionView>
  );
}

export default ProfileChangeScreen;
