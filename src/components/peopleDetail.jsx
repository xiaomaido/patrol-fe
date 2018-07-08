import React from 'react';
import '../assets/css/peopleDetail.less';
import people from '../assets/images/sum.png'
import request from '../tools/request';
import { Toast } from 'antd-mobile';

export default class PeopleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headImg:people,
            data: {},
        };
    }

    componentDidMount() {
        document.title = this.props.title;
        request.post('patrol/staff/list', {
            id: this.props.params.id,
        }).then(({ data }) => {
            if (data.code === 0) {
                this.setState({
                    data: data.data[0]
                })
            }
        }).catch((err) => {
            Toast.fail('请求失败');
        });
    }

    render() {
        return (
            <div className="people-detail">
                 <div className="detail-box center">
                     <div className="team-item-top team-center">
                         <img src={this.state.data.avatar}/>
                         <span>{this.props.role}：{this.state.data.name}</span>
                     </div>
                     <div className="team-item-center team-center">
                         {
                             this.props.watch && (
                                 <div className="item-center-script"><p>守护部位：{this.state.watch}</p></div>
                             )
                         }
                         <div className="item-center-contain"><p>性别：{this.state.sex}</p></div>
                         <div className="item-center-contain"><p>年龄：{this.state.age}</p></div>
                         {
                             this.props.period && (
                                 <div className="item-center-contain"><p>管辖时间：{this.state.data.period}</p></div>
                             )
                         }
                         {
                             this.props.area && (
                                 <div className="item-center-contain"><p>管辖区域：{this.state.data.area}</p></div>
                             )
                         }
                         {
                            this.props.good && (
                                <div className="item-center-contain"><p>擅长：{this.state.data.good}</p></div>
                            )
                         }
                         {
                            this.props.case && (
                                <div className="item-center-contain"><p>案件处理：{this.state.data.case}</p></div>
                            )
                         }
                         {
                             this.props.path && (
                                 <div className="item-center-contain"><p>路线规划：{this.state.data.path}</p></div>
                             )
                         }

                     </div>
                 </div>
            </div>
        )
    }
}