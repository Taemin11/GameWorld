<template>
  <div class="container blueArea">
    <h1>당신의 게임 유형은</h1>
    <h1>대담한 사냥꾼입니다.</h1>

                <hr>

     <p>당신은 대담한 용기를 가진 사람입니다. 자신을 노리는 적들을 베어 넘기고 승리를 쟁취하세요. </p>

     <div class="text-center" style="margin-top:50px;"><h3>당신에게 추천하는 게임</h3></div>
   
    <div class="row">
      <div class="col-md-1"></div>
      <b-card
        class="col-md-5"
        title="Horizon Zero Dawn"
        :img-src="this.header1"
        @click="goDetail(appId1)"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 100%; padding:0 0 0 0; text-align:center; background-image: url('../../src/assets/img/gameboy.png'); background-color:#00000077; height: 100%"
      >
      </b-card>

      <b-card
        class="col-md-5"
        title="Monster Hunter: World"
        :img-src="this.header2"
        @click="goDetail(appId2)"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 100%; margin-left:20px; padding:0 0 0 0;text-align:center; background-image: url('../../src/assets/img/gameboy.png'); background-color:#00000077; height: 100%"
      >
      </b-card>
    </div>
    <div class="row" style="margin-top:50px; margin-bottom:50px; height:50px; background-color:">
      <div class="col-md-1"></div>
      <button class="col-md-10" style="background-color:black; color:#18d26e;" @click="getSimilar(appId1)">Horizon Zero Dawn과 유사한 게임을 확인해보세요</button>
      <div class="col-md-1"></div>
  </div>
      <div class="row" style="margin-top:50px; margin-bottom:50px; height:50px; background-color:">
      <div class="col-md-1"></div>
      <button class="col-md-10" style="background-color:black; color:#18d26e;" @click="getSimilar(appId2)">Monster Hunter: World와 유사한 게임을 확인해보세요</button>
      <div class="col-md-1"></div>
  </div>
  <div class="row">
        <div
          class="col-md-4"
          v-for="games in this.gamedata"
          :key="games.title"
          style="margin-bottom: 20px"
        >
          <b-card
            v-if="games.title != ''"
            :title="games.title"
            :img-src="games.imgsrc"
            img-alt="Image"
            @click="goDetail(games.appid)"
            img-top
            tag="article"
        style="width: 100%; margin-left:10px; margin-right:10px; padding:0 0 0 0; text-align:center;  background-color:#00000077; height: 100%"      >
          >
          </b-card>
        </div>
      </div>


  </div>
</template>

<script>
import axios from "axios";

const SERVER_URL = process.env.VUE_APP_API_SERVER_URL;
const REC_SERVER_URL = process.env.VUE_APP_REC_SERVER_URL;

export default {
  data() {
    return {
      result: "",
      headerUrl: "",
      linkUrls: [],
      videoUrl: "",
      gameDes: "",
      genreList: [],
      gameInfo: null,
      appId: "361420",
      appId2: "361420",
      header1: "",
      header2: "",
      gamedata: "",
      gamedata1: "",
      gamedata2: "",
    };
  },

  created() {

    
    this.appId1="1151640";
    this.appId2="582010";

    console.log(this.headerUrl);
    this.header1 ="https://cdn.cloudflare.steamstatic.com/steam/apps/"+this.appId1+"/header.jpg"
    this.header2 ="https://cdn.cloudflare.steamstatic.com/steam/apps/"+this.appId2+"/header.jpg"

  },
  methods: {

    goDetail: function(appid) {
      console.log("가자가자"+appid)
      this.$router.push({ path: "/detail", query: { appId: appid } });
    },
    getSimilar: function(appid){
            this.gamedata=[];
      console.log("비스무리");
       axios.get(`${REC_SERVER_URL}/cbf/`+appid)
      .then((res) => {
        var i = 0;
        for (i = 0; i < 9; i++) {
          // this.gamedata.title = res.data.data[i].name;
          // this.gamedata.thumnail = res.data.data[i].imgsrc;
          this.gamedata = [
            ...this.gamedata,
            ...[
              {
                title: res.data.data[i].name,
                appid: res.data.data[i].appid,
                imgsrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/"+res.data.data[i].appid+"/header.jpg"
              },
            ],
          ];
        }
        // console.log(this.gamedata);
      })
      .catch((err) => {
        console.log(err);
      });


    }
  },
};
</script>