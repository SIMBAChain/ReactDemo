.. figure:: Simba-NS.png
   :align:   center
   
******************
SIMBA React Demo Docs
******************

==============
Npm is needed for running react applications
NodeJS link: https://nodejs.org/en/


`Here <https://www.youtube.com/watch?v=1BatYaRD60c&list=PLgfX2jfDfJNMEqF_xjZBYmavONXeRK_q5>`_ is a playlist on the SIMBA Chain Youtube channel to get you up to speed on using the dashboard.

.. _contract:
Smart Contract
**************

pragma solidity ^0.4.24;

contract Application {
    function Application() public {}
    enum Assets {
        game
    }
    Assets _turns = Assets.game;

    function turns (
        string assetId,
        string name, 
        string turn0, 
        string turn1, 
        string turn2, 
        string turn3, 
        string turn4, 
        string turn5,
        string turn6, 
        string turn7, 
        string turn8,
        string turn9)  
    public {}
}



.. _dashboard:
Creating an app on the SIMBA Dashboard
***************
Before Starting make sure you have an account on the Simba Dashboard and an Ethereum wallet with Ether in it on the Circle of life network

* Create The Smart Contract
* Create The Application
* Configure The Application(Ethereum Blockchain, Circle of Life, IPFS Filesystem, Permission disabled)
* Generate Application API Key(This is not the API name)
* Generate Configuration API Key

 .. note:: Both application an application API key and a configuration API key is needed. These keys are not interchangable.
Converting the React Demo example to your app
***************
* Everything you need to change is inside of index.js
* Changing the url
   * placeholder
* Changing the API Keys
   * placeholder
* Run locally
   * with a terminal at the project folder run npm start
   * your project should be at localhost:3000
* Deploying the application
   * Guide for deploying a react application to Github pages: https://medium.com/the-andela-way/how-to-deploy-your-react-application-to-github-pages-in-less-than-5-minutes-8c5f665a2d2a

Based off of this https://reactjs.org/tutorial/tutorial.html
Github Repo https://github.com/SIMBAChain/ReactDemo
React Demo https://simbachain.github.io/ReactDemo/
