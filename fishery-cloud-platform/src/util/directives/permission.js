import axios from 'axios';

// (async function getPermission() {
//     const { data: res } = await axios.get('http://119.23.218.131:9102/function');
//     console.log('res: ', res);
// })()
const permissionList = [
    {
        "id": "1324928826706341888",
        "name": "traceability_pond",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 1,
        "href": null,
        "remarks": "池塘管理",
        "children": [
            {
                "id": "1324929250763042816",
                "name": "traceability_pond_add",
                "createDate": null,
                "parentId": "1324928826706341888",
                "sort": 1,
                "href": null,
                "remarks": "池塘增加",
                "children": null
            },
            {
                "id": "1324929521148768256",
                "name": "traceability_pond_delete",
                "createDate": null,
                "parentId": "1324928826706341888",
                "sort": 2,
                "href": null,
                "remarks": "池塘删除",
                "children": null
            },
            {
                "id": "1324931061892829184",
                "name": "traceability_pond_update",
                "createDate": null,
                "parentId": "1324928826706341888",
                "sort": 3,
                "href": null,
                "remarks": "池塘修改",
                "children": null
            },
            {
                "id": "1324931271993962496",
                "name": "traceability_pond_select",
                "createDate": null,
                "parentId": "1324928826706341888",
                "sort": 4,
                "href": null,
                "remarks": "池塘查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962497",
        "name": "traceability_agricultural",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 2,
        "href": null,
        "remarks": "农资管理",
        "children": [
            {
                "id": "1324934160988561409",
                "name": "traceability_agricultural_add",
                "createDate": null,
                "parentId": "1324931271993962497",
                "sort": 1,
                "href": null,
                "remarks": "农资增加",
                "children": null
            },
            {
                "id": "1324934160988561410",
                "name": "traceability_agricultural_delete",
                "createDate": null,
                "parentId": "1324931271993962497",
                "sort": 2,
                "href": null,
                "remarks": "农资删除",
                "children": null
            },
            {
                "id": "1324934160992755712",
                "name": "traceability_agricultural_update",
                "createDate": null,
                "parentId": "1324931271993962497",
                "sort": 3,
                "href": null,
                "remarks": "农资修改",
                "children": null
            },
            {
                "id": "1324934160992755713",
                "name": "traceability_agricultural_select",
                "createDate": null,
                "parentId": "1324931271993962497",
                "sort": 4,
                "href": null,
                "remarks": "农资查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962498",
        "name": "traceability_shrimp",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 3,
        "href": null,
        "remarks": "虾苗进货",
        "children": [
            {
                "id": "1324934160992755715",
                "name": "traceability_shrimp_add",
                "createDate": null,
                "parentId": "1324931271993962498",
                "sort": 1,
                "href": null,
                "remarks": "虾苗进货增加",
                "children": null
            },
            {
                "id": "1324934160992755716",
                "name": "traceability_shrimp_delete",
                "createDate": null,
                "parentId": "1324931271993962498",
                "sort": 2,
                "href": null,
                "remarks": "虾苗进货删除",
                "children": null
            },
            {
                "id": "1324934160992755717",
                "name": "traceability_shrimp_update",
                "createDate": null,
                "parentId": "1324931271993962498",
                "sort": 3,
                "href": null,
                "remarks": "虾苗进货修改",
                "children": null
            },
            {
                "id": "1324934160992755718",
                "name": "traceability_shrimp_select",
                "createDate": null,
                "parentId": "1324931271993962498",
                "sort": 4,
                "href": null,
                "remarks": "虾苗进货查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962499",
        "name": "traceability_shrimpInfo",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 4,
        "href": null,
        "remarks": "虾苗信息",
        "children": [
            {
                "id": "1324940916355612672",
                "name": "traceability_shrimpInfo_add",
                "createDate": null,
                "parentId": "1324931271993962499",
                "sort": 1,
                "href": null,
                "remarks": "虾苗信息增加",
                "children": null
            },
            {
                "id": "1324940916355612673",
                "name": "traceability_shrimpInfo_delete",
                "createDate": null,
                "parentId": "1324931271993962499",
                "sort": 2,
                "href": null,
                "remarks": "虾苗信息删除",
                "children": null
            },
            {
                "id": "1324940916355612674",
                "name": "traceability_shrimpInfo_update",
                "createDate": null,
                "parentId": "1324931271993962499",
                "sort": 3,
                "href": null,
                "remarks": "虾苗信息修改",
                "children": null
            },
            {
                "id": "1324940916355612675",
                "name": "traceability_shrimpInfo_select",
                "createDate": null,
                "parentId": "1324931271993962499",
                "sort": 4,
                "href": null,
                "remarks": "虾苗信息查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962500",
        "name": "traceability_inputs",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 5,
        "href": null,
        "remarks": "投入品管理",
        "children": [
            {
                "id": "1324940916355612676",
                "name": "traceability_inputs_add",
                "createDate": null,
                "parentId": "1324931271993962500",
                "sort": 1,
                "href": null,
                "remarks": "投入品增加",
                "children": null
            },
            {
                "id": "1324940916355612677",
                "name": "traceability_inputs_delete",
                "createDate": null,
                "parentId": "1324931271993962500",
                "sort": 2,
                "href": null,
                "remarks": "投入品删除",
                "children": null
            },
            {
                "id": "1324940916355612678",
                "name": "traceability_inputs_update",
                "createDate": null,
                "parentId": "1324931271993962500",
                "sort": 3,
                "href": null,
                "remarks": "投入品修改",
                "children": null
            },
            {
                "id": "1324940916355612679",
                "name": "traceability_inputs_select",
                "createDate": null,
                "parentId": "1324931271993962500",
                "sort": 4,
                "href": null,
                "remarks": "投入品查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962501",
        "name": "traceability_monitor",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 6,
        "href": null,
        "remarks": "监控设备",
        "children": [
            {
                "id": "1324941567517097984",
                "name": "traceability_monitor_add",
                "createDate": null,
                "parentId": "1324931271993962501",
                "sort": 1,
                "href": null,
                "remarks": "监控增加",
                "children": null
            },
            {
                "id": "1324941567521292288",
                "name": "traceability_monitor_delete",
                "createDate": null,
                "parentId": "1324931271993962501",
                "sort": 2,
                "href": null,
                "remarks": "监控删除",
                "children": null
            },
            {
                "id": "1324941567521292289",
                "name": "traceability_monitor_update",
                "createDate": null,
                "parentId": "1324931271993962501",
                "sort": 3,
                "href": null,
                "remarks": "监控修改",
                "children": null
            },
            {
                "id": "1324941567521292290",
                "name": "traceability_monitor_select",
                "createDate": null,
                "parentId": "1324931271993962501",
                "sort": 4,
                "href": null,
                "remarks": "监控查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962502",
        "name": "traceability_atmosphere",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 7,
        "href": null,
        "remarks": "气象设备",
        "children": [
            {
                "id": "1324941567521292291",
                "name": "traceability_atmosphere_add",
                "createDate": null,
                "parentId": "1324931271993962502",
                "sort": 1,
                "href": null,
                "remarks": "气象设备增加",
                "children": null
            },
            {
                "id": "1324941567521292292",
                "name": "traceability_atmosphere_delete",
                "createDate": null,
                "parentId": "1324931271993962502",
                "sort": 2,
                "href": null,
                "remarks": "气象设备删除",
                "children": null
            },
            {
                "id": "1324941567521292293",
                "name": "traceability_atmosphere_update",
                "createDate": null,
                "parentId": "1324931271993962502",
                "sort": 3,
                "href": null,
                "remarks": "气象设备修改",
                "children": null
            },
            {
                "id": "1324941567521292294",
                "name": "traceability_atmosphere_select",
                "createDate": null,
                "parentId": "1324931271993962502",
                "sort": 4,
                "href": null,
                "remarks": "气象设备查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962503",
        "name": "traceability_waterquality",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 8,
        "href": null,
        "remarks": "水质设备",
        "children": [
            {
                "id": "1324942303269236736",
                "name": "traceability_waterquality_add",
                "createDate": null,
                "parentId": "1324931271993962503",
                "sort": 1,
                "href": null,
                "remarks": "水质设备增加",
                "children": null
            },
            {
                "id": "1324942303269236737",
                "name": "traceability_waterquality_delete",
                "createDate": null,
                "parentId": "1324931271993962503",
                "sort": 2,
                "href": null,
                "remarks": "水质设备删除",
                "children": null
            },
            {
                "id": "1324942303269236738",
                "name": "traceability_waterquality_update",
                "createDate": null,
                "parentId": "1324931271993962503",
                "sort": 3,
                "href": null,
                "remarks": "水质设备修改",
                "children": null
            },
            {
                "id": "1324942303269236739",
                "name": "traceability_waterquality_select",
                "createDate": null,
                "parentId": "1324931271993962503",
                "sort": 4,
                "href": null,
                "remarks": "水质设备查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962504",
        "name": "traceability_refrigeratory",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 9,
        "href": null,
        "remarks": "冷库",
        "children": [
            {
                "id": "1324942303269236741",
                "name": "traceability_refrigeratory_add",
                "createDate": null,
                "parentId": "1324931271993962504",
                "sort": 1,
                "href": null,
                "remarks": "冷库增加",
                "children": null
            },
            {
                "id": "1324942303269236742",
                "name": "traceability_refrigeratory_delete",
                "createDate": null,
                "parentId": "1324931271993962504",
                "sort": 2,
                "href": null,
                "remarks": "冷库删除",
                "children": null
            },
            {
                "id": "1324942303269236743",
                "name": "traceability_refrigeratory_update",
                "createDate": null,
                "parentId": "1324931271993962504",
                "sort": 3,
                "href": null,
                "remarks": "冷库修改",
                "children": null
            },
            {
                "id": "1324942303269236744",
                "name": "traceability_refrigeratory_select",
                "createDate": null,
                "parentId": "1324931271993962504",
                "sort": 4,
                "href": null,
                "remarks": "冷库查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324931271993962505",
        "name": "traceability_process",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 10,
        "href": null,
        "remarks": "加工厂",
        "children": [
            {
                "id": "1324943021229309952",
                "name": "traceability_process_add",
                "createDate": null,
                "parentId": "1324931271993962505",
                "sort": 1,
                "href": null,
                "remarks": "加工厂增加",
                "children": null
            },
            {
                "id": "1324943021229309953",
                "name": "traceability_process_delete",
                "createDate": null,
                "parentId": "1324931271993962505",
                "sort": 2,
                "href": null,
                "remarks": "加工厂删除",
                "children": null
            },
            {
                "id": "1324943021229309954",
                "name": "traceability_process_update",
                "createDate": null,
                "parentId": "1324931271993962505",
                "sort": 3,
                "href": null,
                "remarks": "加工厂修改",
                "children": null
            },
            {
                "id": "1324943021229309955",
                "name": "traceability_process_select",
                "createDate": null,
                "parentId": "1324931271993962505",
                "sort": 4,
                "href": null,
                "remarks": "加工厂查询",
                "children": null
            }
        ]
    },
    {
        "id": "1324934160988561408",
        "name": "traceability_product",
        "createDate": null,
        "parentId": "1324928369070018560",
        "sort": 11,
        "href": null,
        "remarks": "产品信息",
        "children": [
            {
                "id": "1324943021229309956",
                "name": "traceability_product_add",
                "createDate": null,
                "parentId": "1324934160988561408",
                "sort": 1,
                "href": null,
                "remarks": "产品增加",
                "children": null
            },
            {
                "id": "1324943021229309957",
                "name": "traceability_product_delete",
                "createDate": null,
                "parentId": "1324934160988561408",
                "sort": 2,
                "href": null,
                "remarks": "产品删除",
                "children": null
            },
            {
                "id": "1324943021229309958",
                "name": "traceability_product_update",
                "createDate": null,
                "parentId": "1324934160988561408",
                "sort": 3,
                "href": null,
                "remarks": "产品修改",
                "children": null
            },
            {
                "id": "1324943021229309959",
                "name": "traceability_product_select",
                "createDate": null,
                "parentId": "1324934160988561408",
                "sort": 4,
                "href": null,
                "remarks": "产品查询",
                "children": null
            }
        ]
    }
]

const oneLevel = new Map();
const twoevel = new Map();

permissionList.forEach(item => {
    oneLevel.set(item.name, true);
    if (item.children) {
        item.children.forEach(citem => {
            twoevel.set(citem.name, true);
        })
    }
})
// console.log('oneLevel: ', oneLevel);
// console.log('twoevel: ', twoevel);

export default {
    bind: function (el, binding, vnode) {
        if (oneLevel.has(binding.value) || twoevel.has(binding.value)) {
            el.disabled = false;
            el.classList.remove("is-disabled");
        } else {
            el.disabled = true;
            el.classList.add("is-disabled")
        }
    }
}