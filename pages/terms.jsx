import Layout from '../components/Layout'
import Link from 'next/link'
import Head from 'next/head'

const Terms = () => {
  return (
    <Layout>
      <Head>
        <title>Terms & Conditions - FAB Defense (UK)</title>
        <meta name="description" content="At FAB Defense (UK) we aim to be transparent with you. You are able to read our terms and conditions here." />
      </Head>
      <div className="mx-8 my-8 lg:mx-56 lg:my-12">
        <h1 id="about-us" className="mb-4 font-black text-4xl">Terms & Conditions</h1>
        <h2 className="mt-8 mb-4 font-black text-2xl">Links</h2>
        <h2 className="mt-4 mb-2 font-bold text-2xl">Terms & Conditions</h2>
        <ul>
          <Link href="#about-us"><a className="text-fabred"><li>About Us</li></a></Link>
          <Link href="#contract"><a className="text-fabred"><li>Make a contract with us</li></a></Link>
          <Link href="#place-order"><a className="text-fabred"><li>How to place an order</li></a></Link>
          <Link href="#delivery"><a className="text-fabred"><li>Delivery & Carriage Charges</li></a></Link>
          <Link href="#cancellation"><a className="text-fabred"><li>Cancellation & Returns</li></a></Link>
          <Link href="#faulty"><a className="text-fabred"><li>Faulty Goods</li></a></Link>
          <Link href="#liability"><a className="text-fabred"><li>Liability</li></a></Link>
          <Link href="#trade"><a className="text-fabred"><li>Trade</li></a></Link>
        </ul>
        <h2 className="mt-4 mb-2 font-bold text-2xl">Website Disclaimer</h2>
        <ul>
          <Link href="#use"><a className="text-fabred"><li>Use of website</li></a></Link>
          <Link href="#visitor"><a className="text-fabred"><li>Visitor Conduct</li></a></Link>
          <Link href="#uptime"><a className="text-fabred"><li>Site uptime</li></a></Link>
          <Link href="#links"><a className="text-fabred"><li>Links to & from other websites</li></a></Link>
          <Link href="#exclusion"><a className="text-fabred"><li>Exclusion of liability</li></a></Link>
          <Link href="#law"><a className="text-fabred"><li>Law & Jurisdiction</li></a></Link>
        </ul>

        <hr className="my-4" />
        <h2 id="about-us" className="mt-8 mb-2 font-bold text-2xl">Terms & Conditions</h2>
        <h3 className="my-2 font-semibold text-lg">1. About Us</h3>
        <p>This website www.fabdefense.co.uk/www.fab-defense.co.uk is owned and operated by</p>
        <address className="mt-2">
          <p><strong>Shooting Supplies Ltd</strong></p>
          <p>38 Sherwood Road</p>
          <p>Bromsgrove</p>
          <p>B60 3DR</p>
        </address>
        <p className="mt-2">Email: <a href="mailto:info@shootingsuppliesltd.co.uk" className="text-ssred">info@shootingsuppliesltd.co.uk</a></p>
        <p className="mt-1">Tel: 01527831261</p>
        <p className="mt-4">VAT number GB 793098878</p>
        <p className="mt-1">Registered in England 05156277</p>
        <p className="mt-4">If you need to contact us please use the details above.</p>


        <hr className="my-4" />

        <h3 id="contract" className="mb-2 mt-6 font-semibold text-lg">2. Make a contract with us</h3>
        <p>2.1 When you place an order with us, you are making an offer to buy goods. We will send you an e-mail to confirm that we have received your order.</p>
        <p>2.2 In the unlikely event that the goods are no longer available, or that we have made a pricing mistake, we will advise you of this and there will be no contract between us.</p>
        <p>2.3 Images of products on this website are for illustrative purposes only. Your goods may vary slightly from the image shown on the website and will not include any of the pictured accessories, unless stated in the specification of the goods. Whilst goods may be shown assembled they may require assembly by you.</p>
        <p>2.4 We have made every effort to display as accurately as possible the colours of our products that appear on this website. However, we cannot guarantee that your monitor's display of any colour will accurately reflect the colour of the actual goods.</p>
        <p>2.5 Whilst we try to be as accurate as possible, all information provided is approximate and is provided in good faith.</p>
        <p>2.6 This contract is covered by English law.</p>
        <p>2.7 By placing an order with us, you agree to and accept these terms, as well as our privacy policy and the terms of website use.</p>

        <hr className="my-4" />

        <h3 id="place-order" className="mb-2 mt-6 font-semibold text-lg">3. How to place order</h3>
        <p>3.1 You can use our website to place an order by selecting the product you wish to buy and adding it to your basket. Items you do not require can be removed from your basket at any time. If you prefer to order by telephone you can do so by calling 01527831261.</p>
        <p>3.2 The buyer assumes responsibility for the goods being suitable for the purpose for which they are being purchased.</p>
        <p>3.3 Carriage charges will be shown prior to you placing your order.</p>
        <p>3.4 You will be required to pay for the goods in full at the time of ordering.</p>
        <p>3.5 We use secure payment facilities for online purchases. You can pay for your order by Visa, Mastercard, Delta/Connect.</p>
        <p>3.6 Promotional prices only apply during the period stated.</p>
        <p>3.7 All prices quoted on our website are in UK pounds and include Value Added Tax at the current rate.</p>
        <p>3.8 Once your order has been confirmed, changes may not be possible or may incur additional charges or delays.</p>
        <p>3.9 Once your order is complete your order shall be dispatched within 1-3 working days.</p>
        <p>3.10 Only voucher codes obtained from the FAB Defense (UK) Website will be honoured. Any vouchers from this website that are over 6 months old can be considered expired and will not be accepted.</p>

        <hr className="my-4" />

        <h3 id="delivery" className="mb-2 mt-6 font-semibold text-lg">4. Delivery & Carriage Charges</h3>
        <p>4.1 Goods will be dispatched from our store within 3 working days and any estimated dispatch date is an estimate, which can change without notice. Dispatch may be delayed in accordance with point 4.9.</p>
        <p>4.2 We will deliver goods within 1-3 working days of dispatch. Deliveries may be delayed in accordance with point 4.9.</p>
        <p>4.3 Your order may arrive in more than one delivery.</p>
        <p>4.4 We can deliver our products anywhere in mainland Great Britain</p>
        <p>4.5 We will only deliver goods to the address that matches the card used for payment. You must be at home to accept delivery of your order, which is between 7:30am and 10:00pm Monday-Friday.</p>
        <p>4.6 If there is no one to accept the order on the scheduled delivery date the goods may be returned to the warehouse and we reserve the right to charge you an additional re-delivery charge.</p>
        <p>4.7 Please check the goods on delivery - any goods found to be missing or damaged should be notified to the delivery driver at the time of delivery or ourselves within two working days of delivery of the items.</p>
        <p>4.8 If the goods are lost or damaged please report this to us within two working days from the delivery day.</p>
        <p>4.9 Sometimes, for reasons beyond our control we may be prevented from delivering your goods as planned. These might include things such as accidents, breakdowns, fire, flood, storm, severe weather, acts of god, war, riot, civil commotion, malicious damage or the default of our suppliers. We are not responsible where this causes a delay or failure in delivering your goods.</p>
        <p>4.10 Time is not the essence of the contract unless expressly stated otherwise in writing by a Director of the Company.</p>
        <p>4.11 Free delivery is available on orders where the goods cost more than £50.</p>

        <hr className="my-4" />

        <h3 id="cancellation" className="mb-2 mt-6 font-semibold text-lg">5. Cancellation and returns</h3>
        <p>5.1 This policy does not apply to goods ordered by businesses which are exempt from the Distance Selling Regulations.</p>
        <p>5.2 You can cancel your contract at any time up to 14 days after the day of delivery. To do this, please e-mail, call or write to us.</p>
        <p>5.3 You do not have to give any reason for cancellation. However, a brief explanation will help us to improve the service we offer to customers in the future.</p>
        <p>5.4 If you cancel, you must return the goods within 14 days of cancellation, complete with the original packaging to us and/or our supplier (or any other UK address specified by us), at your own expense. You must ensure that the goods are packaged adequately to protect against damage.</p>
        <p>5.5 You may properly examine the goods for 14 days as you would do had you visited our showroom, however you may not return any goods that have been installed unless they are faulty.</p>
        <p>5.6 If you fail to take reasonable care of the goods before they are returned to us, and this results in damage or deterioration, we will charge you for the reduction in value.</p>
        <p>5.7 We will refund all monies paid to us by you minus any postage / carriage within 30 days, less any costs due under this contract. Please see point 5.1 for exemptions.</p>
        <p>5.8 We reserve the right not to replace any item that has been fitted, as we will deem this acceptance of the goods.</p>
        <p>5.9 We will not be held liable for gunsmith fees or any other professional persons fees due to late, damaged or lost deliveries.</p>
        <p>5.10 We are not liable for any loss of earnings due to late, incorrect or lost deliveries.</p>
        <p>5.11 We reserve the right to refuse replacements on any damaged items reported to us outside of two working days from delivery. This cancellation policy does not affect your legal rights - for example, if goods are faulty or misdescribed.</p>

        <hr className="my-4" />

        <h3 id="faulty" className="mb-2 mt-6 font-semibold text-lg">6. Faulty Goods / Guarantee</h3>
        <p>6.1 If there is a problem with the goods, please notify us by phone, email or in writing providing details of the problem. In addition, you must provide us with a digital photograph of the problem. We will deal with the matter in accordance with your legal rights.</p>
        <p>6.2 All goods are covered by a manufacturer’s warranty against faulty workmanship and materials, subject to the terms and conditions of that warranty.</p>
        <p>6.3 The manufacturer’s warranty is provided in addition to the rights that the law says you have as a consumer and accordingly, your statutory rights are not affected.</p>
        <p>6.4 If an exchange is necessary, this will be arranged without unreasonable delay and without charge. Replacement goods will not be dispatched until the original goods have been received at our store and checked.
        The cost of returning goods to us is your responsibility. If the goods are not faulty, we will return them to you, however you will be required to cover our reasonable postage costs.</p>
        <p>6.5 If an item is no longer available we will offer an alternative. However, our liability will be to replace the faulty goods only and we are unable to guarantee an exact match. In this instance, you will have the option of a refund on the items under the warranty claim.</p>

        <hr className="my-4" />

        <h3 id="liability" className="mb-2 mt-6 font-semibold text-lg">7. Liability</h3>
        <p>7.1 The products sold on this website have been designed to comply with all relevant UK legislation. We cannot warrant or represent that they comply with any legal requirement outside the UK.</p>

        <hr className="my-4" />

        <h3 id="trade" className="mb-2 mt-6 font-semibold text-lg">8. Trade or Business Customers</h3>
        <p>The following conditions apply to orders placed by Trade or Business Customers.</p>
        <p>8.1 Orders may not be cancelled except with our mutual agreement and having been confirmed in writing by a Director of our company. We reserve the right to make cancellation and/or re-stocking charges.</p>
        <p>8.2 Claims for missing or damaged items must be made in writing within 2 working days of delivery.</p>
        <p>8.3 The buyer assumes responsibility for the goods being suitable for the purpose for which they are purchased.</p>

        <hr className="my-4" />

        <h2 id="website" className="mt-8 mb-2 font-bold text-2xl">Website Disclaimer for: www.fabdefense.co.uk & www.fab-defense.co.uk</h2>
        <h3 id="use" className="mb-2 mt-6 font-semibold text-lg">1. Use of Website</h3>
        <p>This disclaimer details our obligations to you regarding our website. Please read this disclaimer in full before you use this Website. Using the Website implies that you accept the terms of this disclaimer. We do occasionally update this disclaimer so please refer back to them in the future.</p>
        <p>1.1 You are permitted to use our website for your own purposes and to print and download material from this Website provided that you do not modify any content without our consent. Any and all material on this website must not be republished online or offline without our permission.</p>
        <p>1.2 The copyright and other intellectual property rights in all material on this Website are owned by us or our licensors and must not be reproduced without our prior consent.</p>
        <p>1.3 Subject to paragraph 1.1, no part of this Website may be reproduced without our prior written permission.</p>

        <hr className="my-4" />

        <h3 id="visitor" className="mb-2 mt-6 font-semibold text-lg">2. Visitor Conduct</h3>
        <p>2.1 With the exception of personally identifiable information, the use of which is covered under our Privacy Policy, any material you send or post to this Website shall be considered non-proprietary and not confidential. Unless you advise to the contrary we will be free to copy, disclose, distribute, incorporate and otherwise use such material for any and all purposes.</p>
        <p>2.2 When using this website you shall not post or send to or from this Website any material for which you have not obtained all necessary consents, is discriminatory, obscene, pornographic, defamatory, liable to incite racial hatred, in breach of confidentiality or privacy, which may cause annoyance or inconvenience to others, which encourages or constitutes conduct that would be deemed a criminal offence, give rise to a civil liability, or otherwise is contrary to the law in the United Kingdom.</p>

        <hr className="my-4" />

        <h3 id="uptime" className="mb-2 mt-6 font-semibold text-lg">3. Site Uptime</h3>
        <p>3.1 We take all reasonable steps to ensure that this Website is available 24 hours every day, 365 days per year. However, websites do sometimes encounter downtime due to server and, other technical issues. Therefore we will not be liable if this website is unavailable at any time.</p>

        <hr className="my-4" />

        <h3 id="links" className="mb-2 mt-6 font-semibold text-lg">4. Links to and From other websites</h3>
        <p>4.1 Any links to third party websites located on this Website are provided for your convenience only. We have not reviewed each third party website and have no responsibility for such third party websites or their content.</p>
        <p>4.2 If you would like to link to this Website, you may only do so on the basis that you link to, but do not replicate, any page on this Website and you do not in any way imply that we are endorsing any services or products unless this has been specifically agreed with us.</p>
        <p>4.3 If you choose to link to our website in breach of Paragraph 4.2 you shall fully indemnify us for any loss or damage suffered as a result of your actions.</p>

        <hr className="my-4" />

        <h3 id="exclusion" className="mb-2 mt-6 font-semibold text-lg">5. Exclusion of Liability</h3>
        <p>5.1 We take all reasonable steps to ensure that the information on this Website is correct. However, we do not guarantee the correctness or completeness of material on this Website. Neither we nor any other party (whether or not involved in producing, maintaining or delivering this Website), shall be liable or responsible for any kind of loss or damage that may result to you or a third party as a result of your or their use of our website. This exclusion shall include servicing or repair costs and, without limitation, any other direct, indirect or consequential loss.</p>

        <hr className="my-4" />

        <h3 id="law" className="mb-2 mt-6 font-semibold text-lg">6. Law and Jurisdiction</h3>
        <p>6.1 This Legal Notice shall be governed by and construed in accordance with English law. Any dispute(s) arising in connection with this Legal Notice are subject to the exclusive jurisdiction of England and Wales.</p>
      </div>
    </Layout>
  )
}

export default Terms