import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const StoryWidth = Dimensions.get('window').width / 1.8;
const PostWidth = Dimensions.get('window').width - 80;

const Container = styled.View`
  border-width: 1px;
  height: ${({mode}) => (mode === 'STORY' ? StoryWidth * 2 : PostWidth)}px;
  width: ${({mode}) => (mode === 'STORY' ? StoryWidth : PostWidth)}px;
  margin: 40px auto;
`;

const Image = styled.Image`
  height: ${({mode}) => (mode === 'STORY' ? StoryWidth * 2 : PostWidth)}px;
`;

const Moldura = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: ${({mode}) => (mode === 'STORY' ? StoryWidth * 2 : PostWidth)}px;
  width: ${({mode}) => (mode === 'STORY' ? StoryWidth : PostWidth)}px;
`;

const Controls = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
`;

const Button = styled.TouchableOpacity`
  background: ${({active}) => (active ? '#eee' : '#fff')};
  padding: 12px;
`;

const ShareButton = styled.TouchableOpacity`
  align-self: center;
`;

const Text = styled.Text``;

function App() {
  const [photoType, setPhotoType] = useState('STORY');
  const [backgroundImage, setBackgroundImage] = useState();
  const [moldura, setMoldura] = useState();
  const viewShotRef = useRef(null);

  function changePhotoType(type) {
    setPhotoType(type);
  }

  function changeToStory() {
    changePhotoType('STORY');
  }

  function changeToPost() {
    changePhotoType('POST');
  }

  function loadImage() {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: photoType === 'STORY' ? 1080 : 800,
      height: photoType === 'STORY' ? 1920 : 600,
      cropping: true,
      includeBase64: true,
      enableRotationGesture: true,
    }).then(image => {
      setBackgroundImage(image.data);
    });
  }

  function openMoldura() {
    launchImageLibrary({}, response => {
      setMoldura(response.assets[0].uri);
    });
  }

  function share() {
    viewShotRef.current.capture().then(uri => {
      const options = {
        message: 'compartilhar imagem',
        title: 'compatilhar',
        url: uri,
        type: 'image/jpg',
      };

      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1}}>
          <Container mode={photoType}>
            <Image
              resizeMode="cover"
              mode={photoType}
              source={{uri: 'data:image/png;base64,' + backgroundImage}}
            />

            <Moldura
              resizeMode="cover"
              mode={photoType}
              source={{uri: moldura}}
            />
          </Container>
        </ViewShot>

        <ShareButton onPress={share}>
          <Image
            style={{height: 30, width: 30}}
            source={{uri: 'http://pngimg.com/uploads/share/share_PNG15.png'}}
          />
        </ShareButton>

        <Controls>
          <Button
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            onPress={loadImage}>
            <Text>Carregar Imagem</Text>
          </Button>

          <Button
            active={photoType === 'STORY'}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            onPress={changeToStory}>
            <Text>Story</Text>
          </Button>

          <Button
            active={photoType === 'POST'}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            onPress={changeToPost}>
            <Text>Post</Text>
          </Button>

          <Button
            onPress={openMoldura}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}>
            <Text>Moldura</Text>
          </Button>
        </Controls>
      </View>
    </SafeAreaView>
  );
}

export default App;
