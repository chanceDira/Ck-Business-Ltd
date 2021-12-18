import React, { Component } from 'react'
import serviceOne from "../../Assets/11.jpeg"
import serviceTwo from "../../Assets/12.jpeg"
import serviceThree from "../../Assets/21.jpeg"
import Footer from '../Footer/Footer'

export default class About extends Component {
    render() {
        return (
            <div>
                <div className="about-container">
                    <div className="ibarizo_about">
                        <div className="abaut_content">
                            <div className="row pb-5">
                                <div className="col-lg-7">
                                    <h1 className="font-weight-bold  pr-4 mb-4 text-white" style={{ fontSize: "3rem" }}>We make furniture that suit your perception.</h1>
                                    <p>
                                        C.K BUSINESS LTD has enough experience, from the day of opening gate has staring
                                        performing enormously technically and financially. The company started the business with
                                        3 experienced carpenters and two staff in administration, but up to now it reaches at 10
                                        permanent technicians that are always assisted by daily manpower and daily engaged
                                        technicians depending of the volume of work. With these staffs the company uses also in
                                        its business the people in internships either professional or school.
                                        Page 3 of 5
                                        C.K BUSINESS LTD has contracted with many public and private institutions and
                                        potential clients whether it has honored its assignments.
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container-fluid mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 mb-2 ">
                                <div class="card">
                                    <img class="card-img-top w-100" src={serviceOne} alt="Card  cap" />
                                    <div class="card-body">
                                        <p class="card-text">You can find complete furnitures to buy.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-2">
                                <div class="card" >
                                    <img class="card-img-top w-100" src={serviceTwo} alt="Card  cap" />
                                    <div class="card-body">
                                        <p class="card-text"> You  can settle a demand of your choice of the furnitures.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-2">
                                <div class="card" >
                                    <img class="card-img-top w-100" src={serviceThree} alt="Card cap" />
                                    <div class="card-body">
                                        <p class="card-text"> You can find  all quantity you want with a great quality</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-5 mb-4">
                            <h1 className="text-center">What we do</h1>
                            <ul>
                                <li> Wooden materials: Office furniture, home furniture, school and hospital furniture
                                office furniture repairing, interior design</li>
                                <li> Metal furniture: Office furniture, home furniture, school furniture and hospital
                                furniture. </li>
                                <li>Interior design: Home ceiling, ceiling carpeting, doors and windows, bar reception
                                desk and wooden and metal decoration. </li>
                                <li> Curtains: Import, tailoring, supply and fixing all kind of curtains</li>
                                <li>Curtains: Import, tailoring, supply and fixing all kind of curtains </li>
                                <li>Sofa: seating room sofa(home), office sofa and waiting sofa </li>
                                <li>Maintenance and repairing of office equipment </li>
                                <li> Sound proof confectioning and fixing (and carpets )</li>
                                <li>
                                    Office Partitioning
                                </li>
                                <li> Shifting of Office equipment</li>
                                <li>
                                    Import and supply of Furniture, electrical and electronics equipment
                                </li>
                                <li>
                                    Offering training and internship to edge the skills of young graduates
                                </li>
                            </ul>
                        </div>
                        <div className="text-center mt-5 mb-4">
                            <h1>Core services</h1>
                            <p>The quality of the furniture is what we put in front.<br /> We make sure that the custoner is satisfied.</p>
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-4 col-sm-6 mb-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title font-weight-bold">Carpentry</h5>
                                        <p class="card-text">Wooden and Metal furniture manufacturing, Curtain and Carpet supply and fixing and Furniture import(all include supply and fixing)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title font-weight-bold">Supply of General Merchandise Synergy</h5>
                                        <p class="card-text">Interior design, House finishing and decorative, Furniture repairing & remodeling and Import of furniture and industrial machine </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title font-weight-bold">Import, supply and installation of electrical and electronics equipment </h5>
                                        <p class="card-text">All kinds of electrical and electronics our team is ready to suit your order.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
