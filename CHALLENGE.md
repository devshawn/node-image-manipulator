# Down The Pipeline

Using containers and the node server created here, we can create a series of image transformations to manipulate an image. The idea is each container will do one operation on an image, i.e. rotate it, flip it, change its color, etc.

## Walkthrough

Before we present the challenge, we're going to walk through an example of how this works as we have to link containers together in a chain, or pipeline.

To start, open up Rancher (a container management system for Docker) at https://rancher.stellj.es. Click on *authenticate with GitHub* and login with your UMM credentials.

### Starting A Stack

Make sure you are in the `Default` environment. You should see a page called `User Stacks`. This is what we want -- we'll be defining a stack of *services*, in which each service will be a container running a specific image manipulation server.

As an example, we're going to create a small image manipulation stack that rotates an image 180 degrees clockwise and inverts its color. To start, click `Add Stack`. Name your stack something like `yourname-image-demo`. Hit `Create`.

You now have an empty stack. We need to define some services where each service will do an operation on the image.

### Making Services
#### Identity
We have to start by creating an identity service. This basically returns your original image. This is because the node server needs the original image at some point. To do this, click `Add Service`. In the `Name` field, write `Identity`. In the `Select Image` field, put `devshawn/node-image-manipulator`. This is the Docker image of our node server. We do not need to define anything else here -- we do not need any public ports or any environment variables for the identity service. Click `Create`.

#### Invert
Now, let's add a service to invert the colors of our image. Click `Add Service`. In the `Name` field, write `Invert`. Make sure the image is still set to `devshawn/node-image-manipulator`. Now, to make our node server invert the image, we have to set an environment variable. At the bottom, there is an `Add Environment Variable` button. Click that.

Now, the server has a ton of modes that can be set by setting the environment variable `IMAGE_MODE`. Set `IMAGE_MODE` to be `INVERT` here.

Lastly, we have to link this service to our identity service because this is second in the chain. Scroll back up to the top looking for a `Service Links` button. Click that. Now, open up the dropdown `Select a service...` and select `Identity` under your stack. On the right side, set its name as `next`. For every service we connect, we always put it as `next` so the node server knows where to go next. Click `Create`.

#### Rotate
Last, let's add a rotation service. This is also the service that will be open to the public -- the container that will receive the POST request with your image. Click `Add Service` and name it `Rotate`. Make sure the image is still `devshawn/node-image-manipulator`. Let's set our environment variable. Set `IMAGE_MODE` to be `ROTATE`. Rotate also has another environment variable to set the degrees to rotate. Set `IMAGE_SETTING_1` to be `180`. Next, go to `Service Links` again. This time, select `Invert` from the dropdown and set its name as `next`.

Now, we have to do a few things to make this public as it is our last service in the pipeline. Open up the `Port Map` options, which are right above the service links. Choose a port, such as `1234`, that hopefully no one else is using. Set the private container port to be `9001`, the port of our internal node server.

Lastly, we have to schedule this service to spin up containers *only* on the load balancer server -- as the other docker hosts are not public. To do this, click the `Scheduling` tab. Click `Run all containers on a specific host`. Choose `load-balancer` from the dropdown. Hit `Create`.

### Sending your image

Awesome! You should now be able to go to http://demo.stellj.es:1234 (or whatever port you choose) and see a `Hello world!`. Now, let's send our test image. You can use our `send-image.sh` script to do this or use CURL:

```
curl --request POST --data-binary "@node.png" http://demo.stellj.es:1234 >> node-new.png
```

This will send `node.png` to the server, send it through the chain of containers, and save the result as `node-new.png`. Yay!
