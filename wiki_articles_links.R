rm(list=ls())
wikiarticles <- read.table("datafiles/links.tsv",sep = "\t",header = F,stringsAsFactors = F)
colnames(wikiarticles) <- c("linkfrom","linkto")

fword1="Ichthyosaur"
fword2="Hubble_Deep_Field"
fword3="House_of_Lords"
linkers <- wikiarticles[wikiarticles[,1]==fword1 | 
                                wikiarticles[,1]==fword2 | 
                                wikiarticles[,1]==fword3,2]

wikifilter <- wikiarticles[wikiarticles[,1] %in% linkers & wikiarticles[,2] %in% linkers,]
wikiarticles <- unique( wikifilter )

artnm <- unique( c(wikiarticles$linkfrom,wikiarticles$linkto) )


artgrpnum <- as.numeric(sample(x=c(1,2,3,4,5,6,7,8,9,10),replace=T,size=length(artnm)))
artdf <- data.frame(artnm,artgrpnum,stringsAsFactors = F)
colnames(artdf) <- c("name","group")


cart1 <- sapply(wikiarticles[,1],function(x) {match(x,table=artnm)},USE.NAMES = F)
cart1 <- cart1-1
cart2 <- sapply(wikiarticles[,2],function(x) {match(x,table=artnm)},USE.NAMES = F)
cart2 <- cart2-1
cart3 <- rep.int(x = 1,times=length(cart1))

cart <- data.frame(cart1,cart2,cart3,stringsAsFactors = F)
colnames(cart) <- c("source","target","value")

#install.packages("jsonlite")
library(jsonlite)

wikiartdf <- list(artdf,cart)
names(wikiartdf) <- c("nodes","links")
artjson <- toJSON(wikiartdf,pretty=T)
write(artjson,file="WikiArticlesLinks/artjson.json")
