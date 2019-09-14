import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import QA from '../components/QA'
import Error404 from '../Error404'

class ArindhalHomeContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      qas: [
        {
          'q': 'What is project Arindhal?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        },
        {
          'q': 'Why ?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        },
        {
          'q': 'more importantly, How?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        },
        {
          'q': 'Why project Arindhal ?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        }, {
          'q': 'Why project Arindhal ?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        }, {
          'q': 'Why project Arindhal ?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        }, {
          'q': 'Why project Arindhal ?',
          'a': "In early years of Balaji Rao's tenure, Raghoji I Bhonsle helped extend Maratha influence in South\
				and East India. However, he was not on good terms with the Peshwa. Shortly before Balaji's appointment as\
				the Peshwa, Raghoji had led a Maratha force to South India. His mission was to help Pratap Singh of\
				Thanjavur, a royal of the Bhonsle clan, against Dost Ali Khan. Raghoji killed Dost Ali in May 1740,\
				and installed Dost Ali's son Safdar Ali Khan as the Nawab of Arcot. He returned to Satara, and unsuccessfully\
				lodged a protest against Balaji Rao's appointment as the Peshwa. He then returned to South India, where he defeated Chanda Sahib\
				in March 1741"
        }

      ]
    }
  }
  render () {
  	let { qas } = this.state
    return (
      <div className='arindhal_home_content pr-1 pb-3 pt-5'>
        {qas.map(function (qa, i) {
        	return <QA q={qa.q} a={qa.a} key={i} />
   		 })}
      </div>
    )
  }
}
export default ArindhalHomeContent
