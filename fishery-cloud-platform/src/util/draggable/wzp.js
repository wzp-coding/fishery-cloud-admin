// 我的基地-数字基地
// import InfoBase from "../../components/wzp/digital_base/InfoBase";
import Map from "../../components/public_components/Map";
// import WeatherCard from "../../components/wzp/digital_base/WeatherCard";
import { mapState } from "vuex";

const DigitalBase = {
    DraggableInfoBase: {
        components: { InfoBase:()=>import(/* webpackChunkName:"drag-commponents" */'../../components/wzp/digital_base/InfoBase') },
        render(h) {
            return (
                <el-col span={6}>
                    <InfoBase></InfoBase>
                </el-col>
            );
        },
    },
    DraggableMap: {
        // components: { Map:()=>import(/* webpackChunkName:"drag-commponents" */'../../components/public_components/Map') },
        computed:{
            ...mapState(['baseInfo'])
        },
        render(h) {
            return (
                <el-col span={11}>
                    <Map map-name="base" center-point={{ lat: this.baseInfo.positionLatitude || 1, lng: this.baseInfo.positionLongitude || 1, content: this.baseInfo.name }}></Map>
                </el-col>
            );
        },
    },
    DraggableWeatherCard: {
        components: { WeatherCard:()=>import(/* webpackChunkName:"drag-commponents" */'../../components/wzp/digital_base/WeatherCard') },
        render(h) {
            return (
                <el-col span={6}>
                    <WeatherCard></WeatherCard>
                </el-col>
            );
        },
    },
}
export { DigitalBase }

// 基地管理-权限管理
