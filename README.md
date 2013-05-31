MR-ParaMetrix
=============

###SIIM 2013 Annual meeting - Scientific Posters & Demonstrations###

Scientific Abstract - Image Department Management & Administration

##MR ParaMetrix - MR Protocol Quality Insights using NoSQL##

**Authors:**

Simon Rascovsky, MD, MSc, Instituto de Alta Technologia Medica - IATM; Gabriel Castrillon; Catalina Bustamante; Victor Calvo; Jorge Delgado, MD

**Background:**

Standardization of acquisition protocols is an important part of maintaining high quality standards in imaging center operations, and is of special relevance in MRI studies, which include multiple series, each with dozens of parameters. Most of these parameters are user-configurable at acquisition time, which is often necessary but opens the door for high variability between operators and may result in non-reproducible results and deterioration of long term image quality standards [1]. A simple, automated method that provides easy visualization MR protocol parameters and their variability may be a useful tool for quality control initiatives.

Evaluation:

We developed an open source software for easy, web-based visualization and analysis of specific DICOM metadata tags extracted automatically from a directory of DICOM files (779692 documents). These tags were loaded into an open-source NoSQL document based database (CouchDB, Apache Foundation) using a ruby language script generated in previous work by the authors [2]. Relevant queries that traverse this large collection of metadata were generated using the map-reduce algorithm. The tags selected for analysis were: repetition time (TR), echo time (TE), flip angle, number of averages, slice thickness, slice spacing and parallel acquisition factor (SENSE). A web-based interface was developed to allow for easy filtering by date range and scanner-study-series combination which generates a plot of the distribution of values of the selected parameters.

**Discussion:**

NoSQL document-based databases such as CouchDB are useful for problems that require the extraction and analysis of large amounts of non-structured key-value type information, and is quite effective in the aggregation of DICOM header metadata tags. These capabilities also allow for finding patterns and outliers in number-based DICOM tags relevant to MR acquisition protocols that are commonly susceptible to modification by the technologist during scanning. The possibility of extracting meaningful visualizations out of these values opens up several avenues of analysis on the homogeneity of acquisitions and compliance with standardized protocols, and can pinpoint which series and protocols should be targeted for quality control initiatives geared towards reducing variability.

**Conclusion:**

We developed an open-source MRI protocol parameter insight and analysis tool using NoSQL database functionality with map-reduce algorithms that allows for users to gain interesting insights on the variability of MR protocol parameters, geared towards improving homogeneity and quality improvement.

**References:**

1. Barak E. et al. MRI Database Protocoling System Improves Technologist Compliance. RSNA 2011. RSNA Annual Meeting 2011 Quality Storyboards. Available online at: http://rsna2011.rsna.org/search/event_display.cfm?printmode=n&em_id=11001269
2. Rascovsky et al. Informatics in Radiology: Use of CouchDB for Document-based Storage of DICOM Objects. Radiographics (2012).

**Keywords:**

* MRI
* Protocols
* Databases
* NoSQL
* Quality Improvement
* Software
* Data mining
