<template>
  <div id="digitalbase">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的基地</el-breadcrumb-item>
      <el-breadcrumb-item>数字基地</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px">
        <el-col :span="4">
          <i class="el-icon-s-data"></i> <span>数字基地</span></el-col
        >
        <el-col style="width: 100px; float: right">
          <el-button
            type="primary"
            style="float: right"
            plain
            @click="ChangeAuthorityShow"
            >所持权限</el-button
          >
        </el-col>
      </el-row>
      <el-row justify="space-around" type="flex">
        <el-col :span="6">
        </el-col>
        <el-col :span="11">
          <el-card shadow="always">
            <Map map-name="base"></Map>
          </el-card>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
    </div>
    <Authority
      :dialog-visible="isShowAuthority"
      @notifyParent="ChangeAuthorityShow"
    ></Authority>
  </div>
</template>

<script>
import axios from "axios";
import Authority from "../components/wzp/Authority";
import WeatherCard from "../components/wzp/WeatherCard";
import Map from "../components/public_components/Map";

export default {
  name: "DigitalBase",
  components: {
    Map,
    WeatherCard,
    Authority,
  },
  data() {
    return {
      isShowAuthority: false,
    };
  },
  methods: {
    ChangeAuthorityShow() {
      this.isShowAuthority = !this.isShowAuthority;
    },
  },
};
</script>

<style lang="less" scoped>
.weather-card {
  border: 1px solid black;
}
.weatherContent {
  color: rgb(90, 88, 88);
  box-sizing: border-box;
  padding: 2px 10px;
  border: 1px solid black;
  width: 90%;
  margin: 10px auto 0;
  border-radius: 6px;
  background-color: #cce2ff;
  .weatherTop {
    margin-bottom: 0;
    .weatherDay {
      font-size: 70px;
      font-weight: bold;
      margin: 20px 0;
    }

    .weatherRightTop {
      p {
        font-size: 20px;
        line-height: 0;
        padding: 5px 0;
      }
    }
  }

  .weatherBottom {
    margin-bottom: 0;
    .weatherBL {
      p {
        line-height: 0;
        padding: 5px 0;
      }
    }

    .weatherBR {
      p {
        line-height: 0;
        padding: 5px 0;
      }
    }
  }
}
.el-carousel__item .el-image {
  width: 100%;
  height: 180px;
}
.el-carousel__item {
  border-radius: 4px;
  border: 1px solid rgb(179, 176, 176);
}
.el-carousel {
  border-radius: 4px;
  padding: 2px;
}
.baseInformation {
  margin: 0;
}
.baseInformation i {
  color: rgb(45, 46, 46);
  font-size: 18px;
  margin-right: 10px;
}
.baseInformation p {
  color: #6f7074;
  font-size: 14px;
  margin: 0;
}
#map {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(212, 197, 197);
  border-radius: 4px;
}
.cardBody {
  width: 100%;
}
.globalHeader {
  background-color: #eaedf1;
}
.el-carousel {
  .el-carousel__container {
    border: none;
    .el-carousel__item {
      border: none;
    }
  }
}
</style>
