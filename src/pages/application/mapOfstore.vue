<template>
  <div class="bg-white">
    <div class="my-header text-black q-pa-sm bg-white my-border">
      <div class="my-header-l">
        <q-btn flat round icon="img:statics/images/back-B.png" @click="closeDialog"></q-btn>
      </div>
      <div class="my-header-m text-center">选择位置</div>
      <div class="my-header-r">
<!--        <q-btn flat unelevated label="保存" text-color="primary" class="word-no-wrap" @click="sub"></q-btn>-->
      </div>
    </div>
    <div class="mapDiv">
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
              :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=TGSBZ-3P6WI-GG2GB-5SJBC-SQR5V-OLB6K&referer='知了贝'&mapdraggable=1&coord=${lat},${lng}`">
      </iframe>
    </div>
    <div class="custom-form-btn">
      <q-btn class="custom-btn-80l" color="primary" @click="sub">确定</q-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mapOfstore',
    props: ['lat1', 'lng1'],
    data () {
      return {
        lat: 30.55059,
        lng: 104.06502,
        address: '',
        map: undefined,
        marker: undefined
      }
    },
    created () {
      if (this.lat1) {
        this.lat = this.lat1
      }
      if (this.lng1) {
        this.lng = this.lng1
      }
      let vm = this
      window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        let loc = event.data;
        if (loc && loc.module == 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          // console.log(loc)
          vm.lat = loc.latlng.lat
          vm.lng = loc.latlng.lng
          vm.address = loc.poiaddress
        }
      }, false)
    },
    methods: {
      closeDialog () {
        this.$emit('closeDialog')
      },
      sub () { // 上交经纬度
        let params = {
          lng: this.lng,
          lat: this.lat,
          address: this.address
        }
        this.$emit('sub', params)
      }
    }
  }
</script>

<style scoped>
  #mapSec{
    width: 100%;
    height: 40vh;
    margin-top: 5rem;
  }
  .mapDiv{
    height: 83vh;
  }
  .custom-form-btn {
    padding: 10px;
  }
  .my-border{
    border-bottom: 1px solid #e6e6e6;
  }
</style>
