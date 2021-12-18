import React, { Component } from 'react';
import { databaseTrainer as database, storage } from "../../config/db";
import person from "../../Assets/person.jpeg";

export default class Trainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            url: "",
            trainer: "",
            description: "",
            file: "",
            error: "",
            trainerList: ""
        }
    }
    async componentWillMount() {
        database.once("value").then(snap => this.setState({ trainerList: snap.val() }))
        database.on("child_added", snap => {
            if (this.state.trainerList) {
                const newTrainerList = Object.assign(this.state.trainerList, snap.val())
                this.setState({ trainerList: newTrainerList })
            }
        })
        database.on('child_removed', snap => {
            if (this.state.trainerList) {
                const { [snap.key]: trainerList, ...newTrainerList } = this.state.trainerList;
                this.setState({ trainerList: newTrainerList })
            }
        })
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    changeFile = e => {
        let url = e.target.files[0];
        this.setState({ file: url, error: "", trainer: "chance" });
    }
    deletetrainer = async (id) => {
        await database.child(id).remove();
    }
    upload = async () => {
        this.setState({ loading: true })
        if (this.state.file && this.state.trainer) {
            await storage.ref(`certificate/${this.state.trainer}`).put(this.state.file)
            await storage.ref(`certificate/${this.state.trainer}`).getDownloadURL().then((url) => {
                this.setState({ file: "", error: "", loading: false, url: url })
            })
        } else {
            this.setState({ error: "Please choose file first Or write product name ", loading: false })
        }
    }
    render() {
        const data = [];
        if (this.state.trainerList) {
            Object.keys(this.state.trainerList).forEach((key) => {
                this.state.trainerList[key].data ?
                    data.push({
                        id: key,
                        name: this.state.trainerList[key].data.name,
                        location: this.state.trainerList[key].data.location,
                        category: this.state.trainerList[key].data.category,
                        phone: this.state.trainerList[key].data.phone,
                        url: this.state.trainerList[key].data.url,
                    }
                    ) : data.push(this.state.trainerList.data)

            });
        }
        return (
            <div className="ibarizo_home">
                <div className="container-fluid">
                    <div className="container dashboard_container mt-4">
                        <div className="row">
                            {
                                data.length > 0 &&
                                data.map((tranee, index) => {
                                    return (
                                        <>
                                            {
                                                tranee &&
                                                <div className="col-lg-3 col-sm-6 mt-3" key={index}>
                                                    <div class="card" >
                                                        <img class="card-img-top custom-pc" src={tranee.url ? tranee.url : person} alt="Card  cap" />
                                                        <div class="card-body">
                                                            <h5 class="card-title">{tranee.name}</h5>
                                                              <p class="card-text">Category: {tranee.category} <br />  Location: {tranee.location} <br /> Tel: {tranee.phone}</p>
                                                            <button type="button" class="btn btn-warning w-100" onClick={this.deletetrainer.bind(this, tranee.id)}>DELETE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                }).reverse()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
