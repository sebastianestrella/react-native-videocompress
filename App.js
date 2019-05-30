import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Picker } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import { NativeModules } from 'react-native';
const VideoCompressorModule = NativeModules.VideoCompressorModule;

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isCompressing: false,
      startTime: '',
      endTime: '',
      destination: '',
      quality: 'LOW',
      isVideoTaked: false
    };
  }

  takeVideo = async function() {
    if (this.camera) {
      //const options = { quality: RNCamera.Constants.VideoQuality["1080p"] };
      const data = await this.camera.recordAsync();
      console.log("video response");
      console.log(data);
      this.compressVideo(data.uri);
    }
    //this.compressVideo("/storage/emulated/0/DCIM/Camera/VID_20190515_151514.mp4");
  };
  stopVideo = async function() {
    if (this.camera) {
      this.camera.stopRecording();
    }
  };
  compressVideo = async function(data){
    this.setState({isCompressing: true});
    let quality = this.state.quality;
    let {destFile, startTime, endTime} = await VideoCompressorModule.startCompressVideo(data, quality);
    console.log("--------------destFile: "+destFile);
    console.log("--------------startTime: "+startTime);
    console.log("--------------endTime: "+endTime);
    this.setState({isCompressing: false, startTime, endTime, destination: destFile, isVideoTaked: true, originalVideo: data});
  }
  renderLoading(){
    if(this.state.isCompressing){
      return (
        <ActivityIndicator  size="large" color="#0000ff" />
      );
    }
    return null;
  }
  onPlayVideo(){

  }
  renderDisplayVideo(){
    return (
      <View style={styles.container_video}>
        <Video source={{uri: this.state.destination}}
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.backgroundVideo} />
      </View>
    );
  }
  renderDisplayCamera(){
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View>
        <Picker
          selectedValue={this.state.quality}
          style={{height: 50, width: 200, color: '#ffffff'}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({quality: itemValue})
          }>
          <Picker.Item label="LOW" value="LOW" />
          <Picker.Item label="MEDIUM" value="MEDIUM" />
          <Picker.Item label="HIGH" value="HIGH" />
        </Picker>
          {this.renderLoading()}
          <View style={{backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Init time: </Text>
              <Text style={styles.text}>{this.state.startTime}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>End time: </Text>
              <Text style={styles.text}>{this.state.endTime}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Destination: </Text>
              <Text style={styles.text}>{this.state.destination}</Text>
            </View>
          </View>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takeVideo.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Start </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopVideo.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Stop </Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
    );
  }
  render() {
    if(this.state.isVideoTaked){
      return this.renderDisplayVideo();
    }
    return this.renderDisplayCamera();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  container_video: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  backgroundVideo: {
    flex: 1
  },
  btn_play:{
    position: 'absolute',
    bottom: 50
  },
  txt_btn: {
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: '#000000'
  },
});
