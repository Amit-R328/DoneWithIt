import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import S3 from 'react-aws-s3'
import { RNS3 } from 'react-native-aws3'
import listingsApi from '../api/listings'
import CategoryPickerItem from "../components/CategoryPickerItem";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, 'Please select at least one image')
});


const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const location = useLocation()
  const [uploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (listing, { resetForm }) => {
    console.log('lisiting handleSubmit', listing)
    uploadImage(listing)
    setProgress(0)
    setUploadVisible(true)
    const result = await listingsApi.addListing({ ...listing, location },
      progress => setProgress(progress))

    if (!result.ok) {
      setUploadVisible(false)
      alert('Could not save the listing.')
      return
    }
    resetForm()
  }

  // const config = {
  //   bucketName: 'amitr2022',
  //   dirName: 'assets/', /* optional */
  //   region: 'us-east-2',
  //   accessKeyId: 'AKIA5GRBFUU3KAK3VHFE',
  //   secretAccessKey: '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',
  // }
  // const uploadImage = (listing) => {
  //   const ReactS3Client = new S3(config)
  //   const file = listing.images[0]
  //   ReactS3Client
  //     .uploadFile(file)
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err))
  // }

  const uploadImage = (listing) => {
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: listing.images[0],
      name: listing.title + "_full.jpg",
      type: "image/jpg"
    }
    const file2 = {
      uri: listing.images[0],
      name: listing.title + '.jpg',
      type: "image/jpeg"
    }
    const options = {
      keyPrefix: "assets/",
      bucket: "amitr2022",
      region: "us-east-2",
      accessKey: "AKIA5GRBFUU3KAK3VHFE",
      secretKey: "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",
      successActionStatus: 201
    }
    console.log('uri::::::::', file.uri)
    RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        console.log('response', response)
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body)
    })
    console.log('uri::::::::', file.uri)
    RNS3.put(file2, options).then(response => {
      if (response.status !== 201) {
        console.log('response', response)
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body)
    })
  }


  return (
    <Screen style={styles.container}>
      <UploadScreen onDone={() => setUploadVisible(false)} progress={progress} visible={uploadVisible} />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: []
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker items={categories} name="category" numberOfColumns={3} placeholder="Category" width="50%" PickerItemComponent={CategoryPickerItem} />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
