import React, { Component } from 'react'
// import BlogList from '../components/BlogList'
import { Layout } from 'antd';
import MyHeader from '../components/MyHeader'
import MyContent from '../components/MyContent'

const { Header, Content, Footer } = Layout;

export default class Home extends Component {
    render() {
        return (
            <Layout className="layout">
                
                <MyHeader></MyHeader>

                <MyContent></MyContent>
                
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}
