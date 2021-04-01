import React, { Component } from 'react'
import { Layout } from 'antd';
import { Comment, Form, Button, List, Input, Modal } from 'antd';
import moment from 'moment';

const { Content } = Layout;

const { TextArea } = Input;

const CommentList = ({ comments, children }) => (
    <List
        dataSource={comments}
        children={children}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Post
      </Button>
        </Form.Item>
    </>
);

let key = 0;

let uniqueKey = 0;

let btnID = 0;

let arr =[];

let res = [];

export default class MyContent extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        childrenValue: '',
        visible: false,
        id: 0,
        msg: '',
        commentVisible: false,
        children: []
    };

    showModal = (e) => {
        let res = this.state.comments.filter(item => item[0].id == e.target.id);
        this.setState({ msg: res[0][0].msg });
        this.setState({ visible: true });
    };

    handleOk = () => {
        this.setState({ visible: false })
    };

    handleCancel = () => {
        this.setState({ visible: false, commentVisible: false })
    };

    handleID = () => {
        key = ++key;
        this.setState({ id: key });
        return key;
    }

    handleCommentVisible = (e) => {
        this.setState({ commentVisible: true });
        btnID = e.target.id;
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    [{
                        msg: this.state.value,
                        id: this.handleID(),
                        content: <>
                            <p>{this.state.value}</p>
                            <button onClick={this.showModal} id={this.state.id}>View</button>
                            <button style={{ marginLeft: '15px' }} onClick={this.handleCommentVisible} id={this.state.id}>Comment</button>
                        </>,
                        datetime: moment().fromNow(),
                    }],
                ],
            });
        }, 1000);
    };

    handleChildrenSubmit = () => {
        if (!this.state.childrenValue) {
            return;
        }


        setTimeout(() => {
            this.setState({
                childrenValue: '',
                children: [
                    ...this.handleNestedComments(),
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    handleChildrenChange = e => {
        this.setState({
            childrenValue: e.target.value
        });
    };

    handleNestedComments = () => {
        if(!arr[btnID-1]){
            arr[btnID-1] = [];
        };
        arr[btnID-1].push(
            <Comment style={{ marginLeft: '20px' }}
                content={
                    this.state.childrenValue
                }
                key={++uniqueKey}
            />);

        return arr;
    };

    renderComments = () => {

        if (this.state.comments.length > 0) {
            res = this.state.comments.map((item, index) => {
                return <CommentList comments={item} children={this.state.children[index]} key={index} />
            });
        }
        return res;

    };

    render() {
        const { submitting, value, msg, childrenValue } = this.state;
        return (
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {this.renderComments()}
                    <Comment
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                value={value}
                                submitting={submitting}
                            />
                        }
                    />
                </div>
                <Modal title="Post" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div>{msg}</div>
                </Modal>
                <Modal title="Comment" visible={this.state.commentVisible} onCancel={this.handleCancel} footer={null}>
                    <Editor onChange={this.handleChildrenChange}
                        onSubmit={this.handleChildrenSubmit}
                        value={childrenValue} />
                </Modal>
            </Content>
        )
    }
}
