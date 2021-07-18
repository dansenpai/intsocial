import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

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
  background: red;
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

const Text = styled.Text``;

function App() {
  const [photoType, setPhotoType] = useState('STORY');
  const [backgroundImage, setBackgroundImage] = useState();
  const [moldura, setMoldura] = useState();
  const imageRef = useRef(null);

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
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: photoType === 'STORY' ? 1080 : 800,
      height: photoType === 'STORY' ? 1920 : 600,
      cropping: true,
      includeBase64: true,
      enableRotationGesture: true,
    }).then(image => {
      setMoldura(image.data);
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Container mode={photoType}>
          <Image
            ref={imageRef}
            resizeMode="cover"
            mode={photoType}
            source={{uri: 'data:image/png;base64,' + backgroundImage}}
          />
          <Moldura
            ref={imageRef}
            resizeMode="cover"
            mode={photoType}
            source={{uri: 'data:image/png;base64,' + moldura}}
          />
        </Container>

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
