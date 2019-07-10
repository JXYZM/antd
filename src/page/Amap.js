import { Map, MouseTool, Marker, Polyline } from 'react-amap';
import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Button, Card, Row, Col, Tabs, Icon, Tooltip, List, Layout, Form, Descriptions } from 'antd';
import { InputNumber, Input } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1282563_kns8e1am00d.js',
});
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

const namespace = 'planning';

const mapStateToProps = (state) => {
  const flightInformation = state[namespace].flight;
  const heightInformation = state[namespace].height;
  const pointInformation = state[namespace].point;
  const routeInformation = state[namespace].route;
  return {
    flightInformation,
    heightInformation,
    pointInformation,
    routeInformation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickAdd: (newCard) => {
    //   const action = {
    //     type: `${namespace}/addNewCard`,
    //     payload: newCard,
    //   };
    numChangeFlight: (value) => {
      const action = {
        type: `${namespace}/set_flight_num`,
        payload: value,
      };
      //console.log(action.payload)
      dispatch(action);
    },
    heightChange: (e) => {
      const action = {
        type: `${namespace}/set_height`,
        payload: e.target.value,
      };
      dispatch(action);
    },
    getStart: (id) => {
      const action = {
        type: `${namespace}/set_start_point`,
        payload: id,
      };
      dispatch(action);
    },
    getPass: (id) => {
      const action = {
        type: `${namespace}/set_pass_point`,
        payload: id,
      };
      dispatch(action);
    },
    postState: (newState) => {
      const action = {
        type: `${namespace}/pre_to_plan`,
        payload: {
          ...newState
        },
      };
      dispatch(action);
    },
    getRoute: (newState) => {
      const action = {
        type: `${namespace}/get_the_route`,
      };
      dispatch(action);
    },
  };
};

// const layerStyle = {
//   padding: '10px',
//   background: '#fff',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   position: 'absolute',
//   top: '10px',
//   left: '10px'
// };

@connect(mapStateToProps, mapDispatchToProps)
export default class Amap extends Component {
  constructor() {
    super();
    const self = this;
    this.state = {
      what: '点击下方按钮开始绘制',
      load_point: [{ key: 0, position: { longitude: 118.954688, latitude: 32.116967 } },
      { key: 1, position: { longitude: 118.954806, latitude: 32.117008 } },
      { key: 2, position: { longitude: 118.955621, latitude: 32.11729 } },
      { key: 3, position: { longitude: 118.956179, latitude: 32.117467 } },
      { key: 4, position: { longitude: 118.956292, latitude: 32.116931 } },
      { key: 5, position: { longitude: 118.956581, latitude: 32.116617 } },
      { key: 6, position: { longitude: 118.956045, latitude: 32.116426 } },
      { key: 7, position: { longitude: 118.955219, latitude: 32.116213 } },
      { key: 8, position: { longitude: 118.955096, latitude: 32.116167 } },
      { key: 9, position: { longitude: 118.955745, latitude: 32.114904 } },
      { key: 10, position: { longitude: 118.955868, latitude: 32.11495 } },
      { key: 11, position: { longitude: 118.956206, latitude: 32.116122 } },
      { key: 12, position: { longitude: 118.955718, latitude: 32.115908 } },
      { key: 13, position: { longitude: 118.956871, latitude: 32.116481 } },
      { key: 14, position: { longitude: 118.956619, latitude: 32.116245 } },
      { key: 15, position: { longitude: 118.956388, latitude: 32.115768 } },
      { key: 16, position: { longitude: 118.955777, latitude: 32.115568 } },
      { key: 17, position: { longitude: 118.956544, latitude: 32.11544 } },
      { key: 18, position: { longitude: 118.956007, latitude: 32.115277 } },
      { key: 19, position: { longitude: 118.956614, latitude: 32.115295 } },
      { key: 20, position: { longitude: 118.956651, latitude: 32.115209 } },
      { key: 21, position: { longitude: 118.956683, latitude: 32.11515 } },
      { key: 22, position: { longitude: 118.956694, latitude: 32.115918 } },
      { key: 23, position: { longitude: 118.957209, latitude: 32.116326 } },
      { key: 24, position: { longitude: 118.95759, latitude: 32.116149 } },
      { key: 25, position: { longitude: 118.957311, latitude: 32.115868 } },
      { key: 26, position: { longitude: 118.956973, latitude: 32.115631 } },
      { key: 27, position: { longitude: 118.957107, latitude: 32.11544 } },
      { key: 28, position: { longitude: 118.957853, latitude: 32.116027 } },
      { key: 29, position: { longitude: 118.958003, latitude: 32.115936 } },
      { key: 30, position: { longitude: 118.957214, latitude: 32.115318 } },
      { key: 31, position: { longitude: 118.958266, latitude: 32.115849 } },
      { key: 32, position: { longitude: 118.957746, latitude: 32.115395 } },
      { key: 33, position: { longitude: 118.956871, latitude: 32.114754 } },
      { key: 34, position: { longitude: 118.957375, latitude: 32.114959 } },
      { key: 35, position: { longitude: 118.956324, latitude: 32.114623 } },
      { key: 36, position: { longitude: 118.957134, latitude: 32.114255 } },
      { key: 37, position: { longitude: 118.956522, latitude: 32.113755 } },
      { key: 38, position: { longitude: 118.956431, latitude: 32.113687 } },
      { key: 39, position: { longitude: 118.956174, latitude: 32.113559 } },
      { key: 40, position: { longitude: 118.955439, latitude: 32.113296 } },
      { key: 41, position: { longitude: 118.955476, latitude: 32.112982 } },
      { key: 42, position: { longitude: 118.956335, latitude: 32.113378 } },
      { key: 43, position: { longitude: 118.956544, latitude: 32.113228 } },
      { key: 44, position: { longitude: 118.957011, latitude: 32.113005 } },
      { key: 45, position: { longitude: 118.957145, latitude: 32.112951 } },
      { key: 46, position: { longitude: 118.957241, latitude: 32.113069 } },
      { key: 47, position: { longitude: 118.9573, latitude: 32.113173 } },
      { key: 48, position: { longitude: 118.958346, latitude: 32.112896 } },
      { key: 49, position: { longitude: 118.958357, latitude: 32.112787 } },
      { key: 50, position: { longitude: 118.958502, latitude: 32.113278 } },
      { key: 51, position: { longitude: 118.957365, latitude: 32.113541 } },
      { key: 52, position: { longitude: 118.95693, latitude: 32.113882 } },
      { key: 53, position: { longitude: 118.958754, latitude: 32.114068 } },
      { key: 54, position: { longitude: 118.958191, latitude: 32.11415 } },
      { key: 55, position: { longitude: 118.957574, latitude: 32.114614 } },
      { key: 56, position: { longitude: 118.958019, latitude: 32.114995 } },
      { key: 57, position: { longitude: 118.958877, latitude: 32.114745 } },
      { key: 58, position: { longitude: 118.959108, latitude: 32.114082 } },
      { key: 59, position: { longitude: 118.959199, latitude: 32.113373 } },
      { key: 60, position: { longitude: 118.959881, latitude: 32.113478 } },
      { key: 61, position: { longitude: 118.960047, latitude: 32.113082 } },
      { key: 62, position: { longitude: 118.960079, latitude: 32.112996 } },
      { key: 63, position: { longitude: 118.960315, latitude: 32.113023 } },
      { key: 64, position: { longitude: 118.960283, latitude: 32.113155 } },
      { key: 65, position: { longitude: 118.960514, latitude: 32.11306 } },
      { key: 66, position: { longitude: 118.960642, latitude: 32.113191 } },
      { key: 67, position: { longitude: 118.960551, latitude: 32.113564 } },
      { key: 68, position: { longitude: 118.960921, latitude: 32.113673 } },
      { key: 69, position: { longitude: 118.960664, latitude: 32.114795 } },
      { key: 70, position: { longitude: 118.960224, latitude: 32.114677 } },
      { key: 71, position: { longitude: 118.959312, latitude: 32.114536 } },
      { key: 72, position: { longitude: 118.960186, latitude: 32.114895 } },
      { key: 73, position: { longitude: 118.960852, latitude: 32.115004 } },
      { key: 74, position: { longitude: 118.960793, latitude: 32.115427 } },
      { key: 75, position: { longitude: 118.959146, latitude: 32.115241 } },
      { key: 76, position: { longitude: 118.96119, latitude: 32.115059 } },
      { key: 77, position: { longitude: 118.960948, latitude: 32.115459 } },
      { key: 78, position: { longitude: 118.962241, latitude: 32.11331 } },
      { key: 79, position: { longitude: 118.962187, latitude: 32.113423 } },
      { key: 80, position: { longitude: 118.961651, latitude: 32.114318 } },
      { key: 81, position: { longitude: 118.962793, latitude: 32.114591 } },
      { key: 82, position: { longitude: 118.962531, latitude: 32.115286 } },
      { key: 83, position: { longitude: 118.961329, latitude: 32.11485 } },
      { key: 84, position: { longitude: 118.962091, latitude: 32.115281 } },
      { key: 85, position: { longitude: 118.961141, latitude: 32.115168 } },
      { key: 86, position: { longitude: 118.962021, latitude: 32.11589 } },
      { key: 87, position: { longitude: 118.961517, latitude: 32.115868 } },
      { key: 88, position: { longitude: 118.960846, latitude: 32.115799 } },
      { key: 89, position: { longitude: 118.960771, latitude: 32.115913 } },
      { key: 90, position: { longitude: 118.961485, latitude: 32.116018 } },
      { key: 91, position: { longitude: 118.961597, latitude: 32.116063 } },
      { key: 92, position: { longitude: 118.961597, latitude: 32.116485 } },
      { key: 93, position: { longitude: 118.961082, latitude: 32.11684 } },
      { key: 94, position: { longitude: 118.960948, latitude: 32.116949 } },
      { key: 95, position: { longitude: 118.960852, latitude: 32.117226 } },
      { key: 96, position: { longitude: 118.960524, latitude: 32.117399 } },
      { key: 97, position: { longitude: 118.959714, latitude: 32.116713 } },
      { key: 98, position: { longitude: 118.960396, latitude: 32.116167 } },
      { key: 99, position: { longitude: 118.960369, latitude: 32.115877 } },
      { key: 100, position: { longitude: 118.960385, latitude: 32.115718 } },
      { key: 101, position: { longitude: 118.959425, latitude: 32.115622 } },
      { key: 102, position: { longitude: 118.958835, latitude: 32.115686 } },
      { key: 103, position: { longitude: 118.959569, latitude: 32.115754 } },
      { key: 104, position: { longitude: 118.959258, latitude: 32.115986 } },
      { key: 105, position: { longitude: 118.95943, latitude: 32.116195 } },
      { key: 106, position: { longitude: 118.959339, latitude: 32.116349 } },
      { key: 107, position: { longitude: 118.959414, latitude: 32.116917 } },
      { key: 108, position: { longitude: 118.959387, latitude: 32.117294 } },
      { key: 109, position: { longitude: 118.959199, latitude: 32.117276 } },
      { key: 110, position: { longitude: 118.958405, latitude: 32.116554 } },
      { key: 111, position: { longitude: 118.959108, latitude: 32.116027 } },
      { key: 112, position: { longitude: 118.957611, latitude: 32.116485 } }],
      choose_start: false,
      choose_pass: false,
      path: [],
      color: ['yellow', 'brown', 'green', 'red', 'blue'],
    };
    this.amapEvents = {
      created: (mapInstance) => {
        self.map = mapInstance;
      }
    }
    this.lineEvents = {
      created: (ins) => { console.log(ins) },
      show: () => { console.log('line show') },
      // hide: () => {console.log('line hide')},
      // click: () => {console.log('line clicked')},
    }
    this.toolEvents = {
      created: (tool) => {
        self.tool = tool;
      },
      draw({ obj }) {
        self.drawWhat(obj);
      }
    }
    this.markerEvents = {
      created: (instance) => {
        // console.log('Marker 实例创建成功；如果你需要对原生实例进行操作，可以从这里开始；');
        // console.log(instance);
        //instance.setExtData({key: 0})
      },
      click: (e) => {
        // console.log("你点击了这个图标；调用参数为：");
        //console.log(e.target.B.extData.key);
        e.target.setContent((e.target.B.extData.key).toString())
        if (this.state.choose_start === true) {
          // let temp = this.state.start.concat(e.target.B.extData.key)
          // this.setState({
          //   start: temp
          // })
          this.props.getStart(e.target.B.extData.key)
        }
        else if (this.state.choose_pass === true) {
          // let temp = this.state.pass.concat(e.target.B.extData.key)
          // this.setState({
          //   pass: temp
          // })
          this.props.getPass(e.target.B.extData.key)
        }
        console.log(this.state.choose_start)
        console.log(this.state.choose_pass)
      },
      // dblclick: (e) => {
      //   console.log("你刚刚双击了这个图标；调用参数为：");
      //   console.log(e);
      // },
      // ... 支持绑定所有原生的高德 Marker 事件
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = { longitude: 120, latitude: 35 };
  }

  drawWhat(obj) {
    let text = '';
    switch (obj.CLASS_NAME) {
      case 'AMap.Marker':
        text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
        break;
      case 'AMap.Polygon':
        text = `你绘制了一个多边形，有${obj.getPath().length}个端点`;
        break;
      case 'AMap.Circle':
        text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }

  setStart() {
    this.setState({
      choose_start: true,
      choose_pass: false,
    })
  }

  setPass() {
    this.setState({
      choose_start: false,
      choose_pass: true,
    })
  }

  display() {
    let temp = []
    let count_out = 0
    for (let a of this.props.routeInformation) {
      let temptemp = []
      //let count_in = 0
      for (let b of a) {
        let c = Number(b)
        //console.log(c)
        temptemp = temptemp.concat({ longitude: this.state.load_point[c].position.longitude, latitude: this.state.load_point[c].position.latitude })
        //console.log({longitude:this.state.load_point[c].position.longitude,latitude:this.state.load_point[c].position.latitude})
        //console.log(temptemp)
        //count_in += 1
      }
      //console.log(temptemp)
      temp = temp.concat({ route: temptemp, key: count_out })
      count_out += 1
      //console.log(temp)
    }
    this.setState({
      path: temp
    })
    //console.log(this.state.path)
  }

  array2string(arrayContent) {
    //console.log(arrayContent)
    let result = '';
    for (let a of arrayContent) {
      //console.log(a);
      result += a + " "
      //console.log(result);
    }
    return result;
  }

  // array22string(arrayContent) {
  //   //console.log(arrayContent)
  //   let result = '';
  //   for (let a of arrayContent) {
  //     //console.log(a);
  //     result += this.array2string(a) + "\n"
  //     //console.log(result);
  //   }
  //   return result;
  // }

  render() {
    const { flightInformation, heightInformation, pointInformation, routeInformation } = this.props
    const newState = { flightInformation, heightInformation, pointInformation, routeInformation }
    return (
      <div>
        <Layout className="layout">
          <Header >
            <div className="logo" style={{ position: 'absolute', left: 50, textAlign: 'left', color: 'white', fontSize: 24 }} >
              <div><IconFont style={{ padding: '20px' }} type='icon-wurenji-copy' />{`无人机飞行控制平台`}</div>
            </div>
          </Header>
          <Content style={{ padding: 50 }}>
            <div style={{ background: '#fff', padding: 20, minHeight: 500 }}>
              <div>
                <Row type="flex" justify="space-around" align="middle">
                  <div style={{ position: 'relative', left: '0', width: '90%', height: '500px', padding: '20px 0 20px 20px' }}>
                    <Map
                      events={this.amapEvents}
                      plugins={this.mapPlugins}
                      center={this.mapCenter}
                      style={{ right: '0%', width: '80%' }}
                    >
                      <MouseTool events={this.toolEvents} />
                      {this.state.load_point.map((item) => <Marker
                        position={item.position}
                        extData={{ key: item.key }}
                        clickable
                        events={this.markerEvents}
                        //topWhenClick={true}
                      // visible={this.state.visible}
                      />)}
                      {this.state.path.map((item) => <Polyline
                        path={item.route}
                        events={this.lineEvents}
                        showDir={true}
                        //strokeWeight={1500}
                        style={{ strokeWeight: 7, strokeColor: this.state.color[item.key] }}
                      //visible={this.state.visible}
                      />)}
                      {/* <div style={{ left: '10%', width: '80%' }}></div> */}
                    </Map>
                  </div>
                  <div style={{ position: 'relative', left: '0', width: '47px', }}>
                    <List size='small' bordered>
                      <List.Item>
                        <Tooltip placement="right" title="设置起点">
                          <a onClick={() => { this.setStart() }}><IconFont style={{ size: '40' }} type="icon-start" /></a>
                          {/* <Button block onClick={() => { this.drawMarker() }}><IconFont type="icon-qidian1" /></Button> */}
                        </Tooltip>
                      </List.Item>
                      <List.Item>
                        <Tooltip placement="right" title="设置经过点">
                          <a onClick={() => { this.setPass() }}><IconFont type="icon-dingwei" /></a>
                        </Tooltip>
                      </List.Item>
                      <List.Item>
                        <Tooltip placement="right" title="规划路径">
                          <a onClick={(event) => this.props.postState(newState)}><IconFont type="icon-lujingfenxi" /></a>
                        </Tooltip>
                      </List.Item>
                      <List.Item>
                        <Tooltip placement="right" title="获取结果">
                          <a onClick={(event) => this.props.getRoute(event)}><IconFont type="icon-shuaxin1" /></a>
                        </Tooltip>
                      </List.Item>
                      <List.Item>
                        <Tooltip placement="right" title="显示路径">
                          <a onClick={(event) => this.display()}><IconFont type="icon-xianshi" /></a>
                        </Tooltip>
                      </List.Item>
                    </List>
                  </div>
                </Row>
              </div>
              <div style={{ position: 'relative', left: '10%', width: '80%', }}>
                <Tabs defaultActiveKey="1"
                  style={{ textAlign: 'center' }}
                >
                  <TabPane tab="飞行器信息控制面板" key="1">
                    <div>
                      {/* <font size='3'> 飞行器信息控制面板 </font>
                      <hr /> */}
                      {/* <p> 设置飞行器数目 </p> */}
                      {`飞行器数目 : `}<InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChangeFlight(value)} />
                      {/* <Form><Form.Item label="飞行器数目">
                        {this.props.form.getFieldDecorator('num',{
                          rules: [{
                            required:  true,
                          }],
                          initialValue: 3
                        })(<InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChangeFlight(value)} />)}  
                      </Form.Item></Form> */}
                    </div>
                  </TabPane>
                  <TabPane tab="飞行高度控制面板" key="2">
                    <div>
                      {/* <font size='3'> 飞行高度控制面板 </font>
                      <hr /> */}
                      {/* <p> 设置飞行高度 : </p> */}
                      {`飞行高度 : `} <Input style={{ width: 200 }} onChange={(e) => this.props.heightChange(e)} />
                    </div>
                  </TabPane>
                  <TabPane tab="信息展示面板" key="3">
                    <div style={{ position: 'relative', left: '10%', width: '80%' }}>
                      <Descriptions bordered column={2}
                      // title="飞行器信息"
                      >
                        <Descriptions.Item label="飞行器数目">{this.props.flightInformation.num}</Descriptions.Item>
                        {/* </Descriptions>
                      <Descriptions title="高度信息"> */}
                        <Descriptions.Item label="高度">{this.props.heightInformation.h}</Descriptions.Item>
                        {/* </Descriptions>
                      <Descriptions title="地点信息"> */}
                        <Descriptions.Item label="起点">{this.props.pointInformation.start}</Descriptions.Item>
                        <Descriptions.Item label="经过点">{this.array2string(this.props.pointInformation.pass)}</Descriptions.Item>
                        {/* </Descriptions>
                      <Descriptions title="路径信息"> */}
                        <Descriptions.Item label="路径">{this.array2string(this.props.routeInformation)}</Descriptions.Item>
                      </Descriptions>
                    </div>
                    {/* <div>
                      <font size='4'> 信息展示面板</font>
                      <hr />
                      <font size='3'> 飞行器信息</font>
                      <br />
                      <font size='3'> 数目：{this.props.flightInformation.num}</font>
                      <hr />
                      <font size='3'> 高度信息</font>
                      <br />
                      <font size='3'> 高度：{this.props.heightInformation.h}</font>
                      <hr />
                      <font size='3'> 地点信息</font>
                      <br />
                      <font size='3'> 起点：{this.props.pointInformation.start}</font>
                      <br />
                      <font size='3'> 经过点：{this.array2string(this.props.pointInformation.pass)}</font>
                      <hr />
                      <font size='3'> 路径信息</font>
                      <br />
                      <font size='3'> 路径：{this.array2string(this.props.routeInformation)}</font> */}
                    {/* <InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChange(value)}/> */}

                    {/* </div> */}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </div>
    )
  }
}

// const WrappedAmapForm = Form.create()(Amap);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAmapForm));