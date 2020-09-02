import React from 'react'
import { NextPage } from 'next'

interface InitialProps {
  greeting: string
}

interface Props extends InitialProps {}

const IndexPage: NextPage<Props, InitialProps> = (props) => {
  return <h1>Hello World, {props.greeting}</h1>
}

IndexPage.getInitialProps = async () => ({ greeting: 'to the NextJS Tester.' })

export default IndexPage