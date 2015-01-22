# Pythess Ionic Demo
## Getting set up
Make sure you have nodejs (and npm) installed. Then install cordova and ionic:

    npm install -g cordova ionic

## So what is Ionic?
[Ionic](http://ionicframework.com) is a command line utility and javascript/css framework for creating phone apps that look and feel like their native counterparts.

It uses [Apache Cordova](http://cordova.apache.org/) to provide device APIs to applications written in html/javascript. Ionic css and javascript then provides the look and feel of each platform's native toolkits.

So an Ionic app is an [AngularJS](http://angularjs.org/) application running in a webview on your phone (with access to device apis!)

## Hello, Thessalonika!
Lets start a new ionic application:

    ionic start helloSalonika tabs

Now a new ionic project has been installed in helloSalonika. Let's cd to that directory and launch the development server:

    cd helloSalonika/ && ionic serve

Play around with the source code. The dev server auto reloads whenever you save a file. Satisfied? Let's run it on our phone.

## Running on our device
This step requires you have your devices SDK installed. Android, for example, requires android-sdk which can be found [here](http://developer.android.com/sdk/index.html).

Add the android platform:

    ionic platform add android

Now run the application (make sure your phone is plugged in)

    ionic run android --device

Our application is installed and running. Mobile development isn't that hard, is it?

iOS users can add the ios platform using `ionic platform add ios` however it is still necassary to use Xcode to build the application. Sorry :(

# Pythess Chat demo
In the ionicChat directory there is a demo Ionic chat app. It uses websockets to pass messages using the server.py program.

To test it out, you can just visit: [http://toxiccode.com/pythesschat/#/tab/chats](http://toxiccode.com/pythesschat/#/tab/chats)

Or, cd to in the directory and run the development server:

    ionic serve

If you want to run it on your phone, first add your platform:

    ionic add platform android

Then add the media plugin (for chat sounds):

    ionic plugin add org.apache.cordova.media

Now you are ready to build and deploy the app:

    ionic run android --device
