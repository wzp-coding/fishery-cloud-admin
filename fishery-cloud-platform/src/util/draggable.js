// 我的基地-数字基地
import Map from "../components/public_components/Map";
import WeatherCard from "../components/wzp/digital_base/WeatherCard";
import InfoBase from "../components/wzp/digital_base/InfoBase";
const DraggableInfoBase = {
    components: { InfoBase },
    render(h) {
        return (
            <el-col span={6}>
                <InfoBase></InfoBase>
            </el-col>
        );
    },
};
const DraggableMap = {
    components: { Map },
    render(h) {
        return (
            <el-col span={11}>
                <Map map-name="base" center-point={{ lat: this.$store.state.baseInfo.positionLatitude, lng: this.$store.state.baseInfo.positionLongitude, content: this.$store.state.baseInfo.name }}></Map>
            </el-col>
        );
    },
};
const DraggableWeatherCard = {
    components: { WeatherCard },
    render(h) {
        return (
            <el-col span={6}>
                <WeatherCard></WeatherCard>
            </el-col>
        );
    },
};
const DigitalBase = {
    DraggableInfoBase,
    DraggableMap,
    DraggableWeatherCard
}
export { DigitalBase }

// 基地管理-权限管理
