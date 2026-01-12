import CateringClient from './cateringCLient'
import ClinetSay from '../../components/catering/ClinetSay'
import Catering from '../../components/catering/Cater'
import Planning from '@/components/catering/Planning'

const CateringPage = () => {
  return (
    <>
      <CateringClient />
      <ClinetSay />
      <Catering />
      <Planning />
    </>
  )
}

export default CateringPage
