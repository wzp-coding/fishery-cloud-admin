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
                <Map map-name="base"></Map>
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
export {
    DraggableInfoBase,
    DraggableMap,
    DraggableWeatherCard
}