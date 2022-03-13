import React from 'react';

export const withUser = (WrapperComponent)=>{
    class HOC extends React.Component{
        render(){
            const user = JSON.parse(localStorage.getItem("user"));
            return<WrapperComponent user={user}></WrapperComponent>
        }
    }
    return HOC;
}