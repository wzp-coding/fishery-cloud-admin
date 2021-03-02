
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('metarial-dark', {
        "color": [
            "#001852",
            "#f5e8c8",
            "#b8d2c7",
            "#c6b38e",
            "#a4d8c2",
            "#f3d999",
            "#d3758f",
            "#dcc392",
            "#2e4783",
            "#82b6e9",
            "#ff6347",
            "#0a915d",
            "#0a915d",
            "#6699ff",
            "#ff6666",
            "#a092f1",
        ],
        "backgroundColor": "#353535",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#ffffff"
            },
            "subtextStyle": {
                "color": "#ffffff"
            }
        },
        "line": {
            "itemStyle": {
                "borderWidth": "2"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "7",
            "symbol": "circle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "borderWidth": "2"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "7",
            "symbol": "circle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "barBorderWidth": 0,
                "barBorderColor": "#ffffff"
            }
        },
        "pie": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "scatter": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "boxplot": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "parallel": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "sankey": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "funnel": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "gauge": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            }
        },
        "candlestick": {
            "itemStyle": {
                "color": "#e098c7",
                "color0": "transparent",
                "borderColor": "#e098c7",
                "borderColor0": "#8fd3e8",
                "borderWidth": "2"
            }
        },
        "graph": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ffffff"
            },
            "lineStyle": {
                "width": 1,
                "color": "#aaaaaa"
            },
            "symbolSize": "7",
            "symbol": "circle",
            "smooth": true,
            "color": [
                "#e98f6f",
                "#61a0a8",
                "#d53a35",
                "#334b5c"
            ],
            "label": {
                "color": "#ffffff"
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eee",
                    "borderColor": "#444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "#e098c7",
                    "borderColor": "#444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eee",
                    "borderColor": "#444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "#e098c7",
                    "borderColor": "#444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#cccccc"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#cccccc"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#cccccc"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#cccccc"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#cccccc"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#8fd3e8",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#8fd3e8"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#8fd3e8",
                "borderColor": "#8a7ca8"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#8a7ca8",
                "#e098c7",
                "#cceffa"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333"
            }
        },
        "markPoint": {
            "label": {
                "color": "#ffffff"
            },
            "emphasis": {
                "label": {
                    "color": "#ffffff"
                }
            }
        }
    });
}));
