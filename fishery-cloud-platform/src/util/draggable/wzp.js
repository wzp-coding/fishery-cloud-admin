// 我的基地-数字基地
import Map from "../../components/public_components/Map";
import WeatherCard from "../../components/wzp/digital_base/WeatherCard";
import InfoBase from "../../components/wzp/digital_base/InfoBase";
import { mapState } from "vuex";

const DigitalBase = {
    DraggableInfoBase: {
        components: { InfoBase },
        render(h) {
            return (
                <el-col span={6}>
                    <InfoBase></InfoBase>
                </el-col>
            );
        },
    },
    DraggableMap: {
        components: { Map },
        computed:{
            ...mapState(['baseInfo'])
        },
        render(h) {
            return (
                <el-col span={11}>
                    <Map map-name="base" center-point={{ lat: this.baseInfo.positionLatitude || 1, lng: this.baseInfo.positionLongitude || 1, content: this.$store.state.baseInfo.name }}></Map>
                </el-col>
            );
        },
    },
    DraggableWeatherCard: {
        components: { WeatherCard },
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
